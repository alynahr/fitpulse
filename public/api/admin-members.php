<?php
// GET (staff only): all members with their latest membership
require __DIR__ . '/lib/bootstrap.php';
require_staff();

$members = query(
    "SELECT u.id, u.member_code AS memberCode, u.full_name AS fullName, u.email, u.phone,
            u.created_at AS joinedAt,
            (SELECT m.plan_id FROM memberships m WHERE m.user_id = u.id ORDER BY m.created_at DESC LIMIT 1) AS planId,
            (SELECT m.status FROM memberships m WHERE m.user_id = u.id ORDER BY m.created_at DESC LIMIT 1) AS status,
            (SELECT m.current_period_end FROM memberships m WHERE m.user_id = u.id ORDER BY m.created_at DESC LIMIT 1) AS currentPeriodEnd,
            (SELECT MAX(c.checked_in_at) FROM check_ins c WHERE c.user_id = u.id) AS lastVisit
     FROM users u
     WHERE u.role = 'member'
     ORDER BY u.created_at DESC"
)->fetchAll();

json_out(array('members' => $members));
