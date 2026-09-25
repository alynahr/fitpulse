<?php
// GET: who is logged in? Returns { user: null } when nobody is.
require __DIR__ . '/lib/bootstrap.php';
$user = current_user();
json_out(array('user' => $user ? public_user($user) : null));
