<?php
// GET                           -> my upcoming bookings
// POST { classId }              -> book a class
// POST { bookingId, action: "cancel" } -> cancel a booking
require __DIR__ . '/lib/bootstrap.php';
$user = require_login();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $rows = query(
        "SELECT b.id, b.status, c.id AS classId, c.name, c.studio, c.instructor,
                c.starts_at AS startsAt, c.ends_at AS endsAt
         FROM bookings b JOIN classes c ON c.id = b.class_id
         WHERE b.user_id = ? AND b.status <> 'canceled'
         ORDER BY c.starts_at",
        array($user['id'])
    )->fetchAll();
    json_out(array('bookings' => $rows));
}

require_method('POST');
$in = read_json();

if (field($in, 'action') === 'cancel') {
    query("UPDATE bookings SET status = 'canceled' WHERE id = ? AND user_id = ?",
        array((int) field($in, 'bookingId'), $user['id']));
    json_out(array('ok' => true));
}

$classId = (int) field($in, 'classId');
$class = query('SELECT id, capacity FROM classes WHERE id = ?', array($classId))->fetch();
if (!$class) {
    fail('Class not found.', 404);
}
$taken = (int) query("SELECT COUNT(*) AS n FROM bookings WHERE class_id = ? AND status <> 'canceled'",
    array($classId))->fetch()['n'];
if ($taken >= (int) $class['capacity']) {
    fail('Sorry, this class is full.', 409);
}

// Re-booking a class you previously canceled reuses the same row
query(
    "INSERT INTO bookings (user_id, class_id, status) VALUES (?, ?, 'confirmed')
     ON DUPLICATE KEY UPDATE status = 'confirmed'",
    array($user['id'], $classId)
);
json_out(array('ok' => true), 201);
