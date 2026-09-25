<?php
// POST { fullName, phone, dateOfBirth, gender, address, city, province, postalCode, country }
require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
$user = require_login();
$in = read_json();

$map = array(
    'fullName' => 'full_name', 'phone' => 'phone', 'dateOfBirth' => 'date_of_birth',
    'gender' => 'gender', 'address' => 'address', 'city' => 'city',
    'province' => 'province', 'postalCode' => 'postal_code', 'country' => 'country',
);
$sets = array();
$params = array();
foreach ($map as $key => $column) {
    if (array_key_exists($key, $in)) {
        $value = field($in, $key);
        if ($column === 'date_of_birth' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
            $value = null;
        }
        $sets[] = $column . ' = ?';
        $params[] = $value;
    }
}
if ($sets) {
    $params[] = $user['id'];
    query('UPDATE users SET ' . implode(', ', $sets) . ' WHERE id = ?', $params);
}
json_out(array('user' => public_user(current_user())));
