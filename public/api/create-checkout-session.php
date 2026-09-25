<?php
// POST { planId }  ->  { url }
// Returns the plan's Stripe Payment Link with the member's id attached,
// so the webhook knows who paid. No connection to Stripe is needed.
require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
$user = require_login();
$in = read_json();

$plan = query('SELECT id, stripe_payment_link_url FROM plans WHERE id = ? AND active = 1',
    array(field($in, 'planId')))->fetch();
if (!$plan || !$plan['stripe_payment_link_url']) {
    fail('This plan has no Stripe Payment Link yet. Add it to the plans table.');
}

$active = query("SELECT id FROM memberships WHERE user_id = ? AND status = 'active'", array($user['id']))->fetch();
if ($active) {
    fail('You already have an active membership.', 409);
}

$url = $plan['stripe_payment_link_url']
    . (strpos($plan['stripe_payment_link_url'], '?') === false ? '?' : '&')
    . http_build_query(array(
        'client_reference_id' => $user['id'],
        'prefilled_email' => $user['email'],
    ));

json_out(array('url' => $url));
