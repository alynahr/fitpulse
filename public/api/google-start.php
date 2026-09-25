<?php
// Sends the browser to Google's sign-in page.
// ?next=plan  -> after sign-in, open plan selection (used by the Join form)
// ?next=login -> after sign-in, open the dashboard (used by the Login modal)
require __DIR__ . '/lib/bootstrap.php';

if (!config('google_client_id')) {
    header('Location: ' . rtrim(config('site_url'), '/') . '/?auth_error='
        . rawurlencode("Google sign-in isn't available on this site yet. Please sign up with your email."));
    exit;
}

start_session();
$state = bin2hex(random_bytes(16));
$_SESSION['google_state'] = $state;
$_SESSION['google_next'] = (isset($_GET['next']) && $_GET['next'] === 'plan') ? 'plan' : 'login';

$params = array(
    'client_id' => config('google_client_id'),
    'redirect_uri' => rtrim(config('site_url'), '/') . '/api/google-callback.php',
    'response_type' => 'code',
    'scope' => 'openid email profile',
    'state' => $state,
    'prompt' => 'select_account',
);

header('Location: https://accounts.google.com/o/oauth2/v2/auth?' . http_build_query($params));
exit;
