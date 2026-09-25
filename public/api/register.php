<?php
// POST { email, password, fullName, phone, dateOfBirth, gender, address, city, province, postalCode, country }
require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
$in = read_json();

$email = strtolower(field($in, 'email'));
$password = isset($in['password']) ? (string) $in['password'] : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('Please enter a valid email address.');
}
if (strlen($password) < 8) {
    fail('Password must be at least 8 characters.');
}
if (query('SELECT id FROM users WHERE email = ?', array($email))->fetch()) {
    fail('An account with this email already exists. Please log in instead.', 409);
}

$dob = field($in, 'dateOfBirth');
$id = create_user(array(
    'email' => $email,
    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
    'full_name' => field($in, 'fullName'),
    'phone' => field($in, 'phone'),
    'date_of_birth' => preg_match('/^\d{4}-\d{2}-\d{2}$/', $dob) ? $dob : null,
    'gender' => field($in, 'gender'),
    'address' => field($in, 'address'),
    'city' => field($in, 'city'),
    'province' => field($in, 'province'),
    'postal_code' => field($in, 'postalCode'),
    'country' => field($in, 'country'),
));

login_user($id);
json_out(array('user' => public_user(current_user())), 201);
