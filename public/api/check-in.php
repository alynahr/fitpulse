<?php
// POST (staff only) { memberCode, location } -> record a gym check-in
// GET  (staff only) -> latest 100 check-ins for the attendance log
require __DIR__ . '/lib/bootstrap.php';
require_staff();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rows = query(
        'SELECT c.id, c.location, c.type, c.checked_in_at AS checkedInAt,
                u.full_name AS fullName, u.member_code AS memberCode
         FROM check_ins c JOIN users u ON u.id = c.user_id
         ORDER BY c.checked_in_at DESC LIMIT 100'
    )->fetchAll();
    json_out(array('checkIns' => $rows));
}

require_method('POST');
$in = read_json();

$member = query('SELECT id, full_name FROM users WHERE member_code = ?', array(field($in, 'memberCode')))->fetch();
if (!$member) {
    fail('No member with that code.', 404);
}
$active = query("SELECT id FROM memberships WHERE user_id = ? AND status = 'active'", array($member['id']))->fetch();
if (!$active) {
    fail($member['full_name'] . ' has no active membership.', 409);
}

query('INSERT INTO check_ins (user_id, location) VALUES (?, ?)',
    array($member['id'], field($in, 'location', 'Main Gym') ?: 'Main Gym'));
json_out(array('ok' => true, 'fullName' => $member['full_name']), 201);
