<?php
require_once("php/get_func.php");

session_start();

$base = sec_get("base");
$_SESSION["base"] = $base;

?>
