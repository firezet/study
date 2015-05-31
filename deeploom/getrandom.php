<?php
require_once("php/get_func.php");

$count = intval(sec_get("count"));
$request = get_random($count);

echo json_encode($request);

?>
