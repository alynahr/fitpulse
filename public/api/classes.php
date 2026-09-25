<?php
// GET ?from=2026-09-01&to=2026-09-08  -> classes in that range, with spots taken
// POST (staff) { name, studio, instructor, startsAt, endsAt, capacity, description } -> add a class
require __DIR__ . '/lib/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_staff();
    $in = read_json();
    if (!field($in, 'name') || !field($in, 'startsAt') || !field($in, 'endsAt')) {
        fail('name, startsAt and endsAt are required.');
    }
    query(
        'INSERT INTO classes (name, studio, instructor, starts_at, ends_at, capacity, description)
         VALUES (?, ?, ?, ?, ?, ?, ?)',
        array(field($in, 'name'), field($in, 'studio'), field($in, 'instructor'),
              field($in, 'startsAt'), field($in, 'endsAt'),
              max(1, (int) field($in, 'capacity', '20')), field($in, 'description'))
    );
    json_out(array('id' => (int) db()->lastInsertId()), 201);
}

$user = require_login();
$from = isset($_GET['from']) ? $_GET['from'] : date('Y-m-d');
$to = isset($_GET['to']) ? $_GET['to'] : date('Y-m-d', strtotime('+7 days'));

$classes = query(
    "SELECT c.id, c.name, c.studio, c.instructor, c.starts_at AS startsAt, c.ends_at AS endsAt,
            c.capacity, c.description,
            (SELECT COUNT(*) FROM bookings b WHERE b.class_id = c.id AND b.status <> 'canceled') AS booked,
            (SELECT b.id FROM bookings b WHERE b.class_id = c.id AND b.user_id = ? AND b.status <> 'canceled') AS myBookingId
     FROM classes c
     WHERE c.starts_at >= ? AND c.starts_at < ?
     ORDER BY c.starts_at",
    array($user['id'], $from, $to)
)->fetchAll();

json_out(array('classes' => $classes));
