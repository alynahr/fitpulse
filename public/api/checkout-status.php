<?php
// GET: the member's latest membership, read from the database.
// The site calls this a few times after returning from Stripe while it waits
// for the webhook to arrive (usually a few seconds).
require __DIR__ . '/lib/bootstrap.php';
$user = require_login();

$membership = query(
    'SELECT plan_id AS planId, status, current_period_end AS currentPeriodEnd
     FROM memberships WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
    array($user['id'])
)->fetch();

json_out(array('membership' => $membership ?: null));
