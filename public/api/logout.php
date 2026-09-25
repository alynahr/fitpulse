<?php
require __DIR__ . '/lib/bootstrap.php';
require_method('POST');
start_session();
$_SESSION = array();
session_destroy();
json_out(array('ok' => true));
