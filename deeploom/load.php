<?php
require_once("php/get_func.php");

$base = sec_get("base");
$request = get_load($base);

echo json_encode($request);
?>
