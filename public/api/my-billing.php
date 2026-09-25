<?php
// GET: the logged-in member's current membership and payment history
require __DIR__ . '/lib/bootstrap.php';
$user = require_login();

$membership = query(
    'SELECT m.plan_id AS planId, p.name AS planName, p.price_php AS pricePhp, m.status,
            m.current_period_end AS currentPeriodEnd, m.created_at AS createdAt
     FROM memberships m JOIN plans p ON p.id = m.plan_id
     WHERE m.user_id = ? ORDER BY m.created_at DESC LIMIT 1',
    array($user['id'])
)->fetch();

$payments = query(
    'SELECT id, amount, currency, description, status, created_at AS createdAt
     FROM payments WHERE user_id = ? ORDER BY created_at DESC',
    array($user['id'])
)->fetchAll();

json_out(array('membership' => $membership ?: null, 'payments' => $payments));
