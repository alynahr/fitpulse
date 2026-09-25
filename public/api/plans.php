<?php
require __DIR__ . '/lib/bootstrap.php';
$plans = query('SELECT id, name, price_php AS pricePhp, description, popular FROM plans WHERE active = 1 ORDER BY price_php')->fetchAll();
json_out(array('plans' => $plans));
