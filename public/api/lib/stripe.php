<?php
// Stripe helpers for hosts that BLOCK outgoing connections (AwardSpace free).
// The site never calls Stripe. Members pay through Stripe Payment Links, and
// Stripe tells us about it by sending webhook events to stripe-webhook.php.

// Checks the Stripe-Signature header so nobody can fake a payment event.
function stripe_verify_webhook($payload, $header, $secret, $tolerance = 300)
{
    $timestamp = null;
    $signatures = array();
    foreach (explode(',', (string) $header) as $part) {
        $kv = explode('=', trim($part), 2);
        if (count($kv) !== 2) {
            continue;
        }
        if ($kv[0] === 't') {
            $timestamp = (int) $kv[1];
        } elseif ($kv[0] === 'v1') {
            $signatures[] = $kv[1];
        }
    }
    if (!$timestamp || !$signatures || abs(time() - $timestamp) > $tolerance) {
        return false;
    }
    $expected = hash_hmac('sha256', $timestamp . '.' . $payload, $secret);
    foreach ($signatures as $sig) {
        if (hash_equals($expected, $sig)) {
            return true;
        }
    }
    return false;
}

function stripe_status_to_membership($status)
{
    $map = array(
        'active' => 'active',
        'trialing' => 'active',
        'past_due' => 'past_due',
        'unpaid' => 'past_due',
        'canceled' => 'canceled',
        'incomplete_expired' => 'expired',
    );
    return isset($map[$status]) ? $map[$status] : 'pending';
}

function to_datetime($unix)
{
    return $unix ? date('Y-m-d H:i:s', (int) $unix) : null;
}

function find_user_by_email($email)
{
    if (!$email) {
        return null;
    }
    $u = query('SELECT * FROM users WHERE email = ?', array(strtolower($email)))->fetch();
    return $u ?: null;
}

// checkout.session.completed – a member finished paying through a Payment Link.
function handle_checkout_completed($session)
{
    // 1. Who paid? The PAY button adds ?client_reference_id=<user id> to the link.
    $user = null;
    if (!empty($session['client_reference_id']) && ctype_digit((string) $session['client_reference_id'])) {
        $user = query('SELECT * FROM users WHERE id = ?', array((int) $session['client_reference_id']))->fetch() ?: null;
    }
    if (!$user && isset($session['customer_details']['email'])) {
        $user = find_user_by_email($session['customer_details']['email']); // paid via the link directly
    }
    if (!$user) {
        error_log('Stripe checkout for unknown user: ' . $session['id']);
        return;
    }

    // 2. Which plan? Each plan has its own Payment Link (plink_...).
    $plan = null;
    if (!empty($session['payment_link'])) {
        $plan = query('SELECT id FROM plans WHERE stripe_payment_link_id = ?', array($session['payment_link']))->fetch();
    }
    if (!$plan) {
        error_log('Stripe checkout with unknown payment link: ' . (isset($session['payment_link']) ? $session['payment_link'] : 'none'));
        return;
    }

    // 3. Remember the Stripe customer so renewals can be matched later.
    if (!empty($session['customer'])) {
        query('UPDATE users SET stripe_customer_id = ? WHERE id = ? AND (stripe_customer_id IS NULL OR stripe_customer_id = ?)',
            array($session['customer'], $user['id'], $session['customer']));
    }

    $paid = isset($session['payment_status']) && $session['payment_status'] === 'paid';

    // 4. Create/activate the membership. The real period end arrives with the
    //    subscription event; until then assume one month.
    if (!empty($session['subscription'])) {
        query(
            "INSERT INTO memberships (user_id, plan_id, status, stripe_subscription_id, current_period_end)
             VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 1 MONTH))
             ON DUPLICATE KEY UPDATE plan_id = VALUES(plan_id),
               status = IF(status = 'pending', VALUES(status), status)",
            array($user['id'], $plan['id'], $paid ? 'active' : 'pending', $session['subscription'])
        );
    }

    // 5. Record the first payment (invoice.paid may arrive before we know the customer).
    if ($paid && !empty($session['amount_total'])) {
        query(
            'INSERT IGNORE INTO payments (user_id, amount, currency, description, status, stripe_invoice_id)
             VALUES (?, ?, ?, ?, ?, ?)',
            array($user['id'], $session['amount_total'] / 100, $session['currency'],
                  'Membership – ' . strtoupper($plan['id']), 'paid',
                  !empty($session['invoice']) ? $session['invoice'] : $session['id'])
        );
    }
}

// customer.subscription.created / updated / deleted – renewals, cancellations, plan changes.
function handle_subscription($sub)
{
    $end = null;
    if (isset($sub['items']['data'][0]['current_period_end'])) {
        $end = $sub['items']['data'][0]['current_period_end']; // newer API versions
    } elseif (isset($sub['current_period_end'])) {
        $end = $sub['current_period_end'];
    }
    $priceId = isset($sub['items']['data'][0]['price']['id']) ? $sub['items']['data'][0]['price']['id'] : null;
    $plan = $priceId ? query('SELECT id FROM plans WHERE stripe_price_id = ?', array($priceId))->fetch() : null;
    $status = stripe_status_to_membership($sub['status']);

    $existing = query('SELECT id FROM memberships WHERE stripe_subscription_id = ?', array($sub['id']))->fetch();
    if ($existing) {
        query('UPDATE memberships SET status = ?, current_period_end = ?, plan_id = COALESCE(?, plan_id) WHERE id = ?',
            array($status, to_datetime($end), $plan ? $plan['id'] : null, $existing['id']));
        return;
    }

    // Arrived before checkout.session.completed: create it if we already know the customer.
    $user = query('SELECT id FROM users WHERE stripe_customer_id = ?', array($sub['customer']))->fetch();
    if ($user && $plan) {
        query('INSERT INTO memberships (user_id, plan_id, status, stripe_subscription_id, current_period_end)
               VALUES (?, ?, ?, ?, ?)',
            array($user['id'], $plan['id'], $status, $sub['id'], to_datetime($end)));
    }
    // Otherwise checkout.session.completed will create it moments later.
}

// invoice.paid – every monthly payment (including the first one).
function handle_invoice_paid($invoice)
{
    $user = query('SELECT id FROM users WHERE stripe_customer_id = ?', array($invoice['customer']))->fetch();
    if (!$user && !empty($invoice['customer_email'])) {
        $user = find_user_by_email($invoice['customer_email']);
    }
    if (!$user) {
        return; // the first invoice is also recorded by handle_checkout_completed
    }
    $desc = isset($invoice['lines']['data'][0]['description']) ? $invoice['lines']['data'][0]['description'] : 'Membership';
    query(
        'INSERT IGNORE INTO payments (user_id, amount, currency, description, status, stripe_invoice_id)
         VALUES (?, ?, ?, ?, ?, ?)',
        array($user['id'], $invoice['amount_paid'] / 100, $invoice['currency'], $desc, 'paid', $invoice['id'])
    );
}
