<?php
// POST { email, password }
require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
$in = read_json();

$email = strtolower(field($in, 'email'));
$password = isset($in['password']) ? (string) $in['password'] : '';

$user = query('SELECT * FROM users WHERE email = ?', array($email))->fetch();

if ($user && empty($user['password_hash'])) {
    fail('This account uses Google sign-in. Click "Continue with Google".', 401);
}
if (!$user || !password_verify($password, $user['password_hash'])) {
    fail('Incorrect email or password.', 401);
}

login_user($user['id']);
json_out(array('user' => public_user($user)));
