<?php
// Stripe sends payment events here. Add this URL in Stripe > Developers > Webhooks:
//   http://YOUR-SITE/api/stripe-webhook.php
require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/stripe.php';

$payload = file_get_contents('php://input');
$header = isset($_SERVER['HTTP_STRIPE_SIGNATURE']) ? $_SERVER['HTTP_STRIPE_SIGNATURE'] : '';

if (!stripe_verify_webhook($payload, $header, (string) config('stripe_webhook_secret'))) {
    fail('Invalid signature', 400);
}

$event = json_decode($payload, true);
$object = $event['data']['object'];

try {
    switch ($event['type']) {
        case 'checkout.session.completed':
            handle_checkout_completed($object);
            break;

        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            handle_subscription($object);
            break;

        case 'invoice.paid':
            handle_invoice_paid($object);
            break;
    }
} catch (Exception $e) {
    error_log('Webhook error: ' . $e->getMessage());
    fail('Handler error', 500); // Stripe will retry later
}

json_out(array('received' => true));
