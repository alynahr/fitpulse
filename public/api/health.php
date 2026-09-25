<?php
// Open /api/health.php in the browser to check the setup.
require __DIR__ . '/lib/bootstrap.php';

$checks = array('php_version' => PHP_VERSION);

try {
    $checks['database'] = (int) query('SELECT COUNT(*) AS n FROM plans')->fetch()['n'] . ' plans found';
} catch (Exception $e) {
    $checks['database'] = 'ERROR: ' . $e->getMessage();
}

// Payments use Stripe Payment Links, so the site never needs to call Stripe.
try {
    $missing = query("SELECT id FROM plans WHERE active = 1 AND (stripe_payment_link_url IS NULL OR stripe_payment_link_id IS NULL)")->fetchAll();
    $checks['payment_links'] = $missing
        ? 'MISSING for: ' . implode(', ', array_map(function ($r) { return $r['id']; }, $missing))
        : 'all plans have a Payment Link';
} catch (Exception $e) {
    $checks['payment_links'] = 'ERROR: run database/add-payment-links.sql first';
}
$checks['webhook_secret'] = strpos((string) config('stripe_webhook_secret'), 'whsec_') === 0
    && config('stripe_webhook_secret') !== 'whsec_...' ? 'set' : 'MISSING – add it to api/config.php';

$checks['https'] = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'yes' : 'no';
$checks['google_login'] = config('google_client_id') ? 'configured' : 'not configured';

json_out($checks);
