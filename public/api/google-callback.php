<?php
// Google sends the member back here after they choose their account.
require __DIR__ . '/lib/bootstrap.php';
start_session();

$site = rtrim(config('site_url'), '/');

function back_with_error($site, $message)
{
    header('Location: ' . $site . '/?auth_error=' . rawurlencode($message));
    exit;
}

$expected = isset($_SESSION['google_state']) ? $_SESSION['google_state'] : '';
unset($_SESSION['google_state']);
if (!$expected || !isset($_GET['state']) || !hash_equals($expected, (string) $_GET['state'])) {
    back_with_error($site, 'Google sign-in expired. Please try again.');
}
if (empty($_GET['code'])) {
    back_with_error($site, 'Google sign-in was cancelled.');
}

// 1. Swap the code for an access token
$token = http_request('POST', 'https://oauth2.googleapis.com/token', array(
    'code' => $_GET['code'],
    'client_id' => config('google_client_id'),
    'client_secret' => config('google_client_secret'),
    'redirect_uri' => $site . '/api/google-callback.php',
    'grant_type' => 'authorization_code',
), array('Content-Type: application/x-www-form-urlencoded'));

if ($token['status'] !== 200 || empty($token['data']['access_token'])) {
    error_log('Google token error: ' . json_encode($token));
    back_with_error($site, 'Google sign-in failed. Please try again.');
}

// 2. Ask Google who this is
$info = http_request('GET', 'https://openidconnect.googleapis.com/v1/userinfo', array(),
    array('Authorization: Bearer ' . $token['data']['access_token']));
$g = $info['data'];
if ($info['status'] !== 200 || empty($g['sub']) || empty($g['email']) || empty($g['email_verified'])) {
    back_with_error($site, 'Could not read your Google account.');
}

// 3. Find or create the FitPulse account
$email = strtolower($g['email']);
$user = query('SELECT * FROM users WHERE google_id = ? OR email = ? LIMIT 1', array($g['sub'], $email))->fetch();

if ($user) {
    if (!$user['google_id']) {
        query('UPDATE users SET google_id = ? WHERE id = ?', array($g['sub'], $user['id']));
    }
    $userId = $user['id'];
} else {
    $userId = create_user(array(
        'email' => $email,
        'google_id' => $g['sub'],
        'full_name' => isset($g['name']) ? $g['name'] : null,
    ));
}

login_user($userId);
$next = isset($_SESSION['google_next']) ? $_SESSION['google_next'] : 'login';
unset($_SESSION['google_next']);

header('Location: ' . $site . '/?' . ($next === 'plan' ? 'join=plan' : 'login=google'));
exit;
