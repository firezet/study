<?php
require_once("php/get_func.php");

session_start();

if (isset($_SESSION["base"])) {
	$base = sec_string($_SESSION["base"]);
	$request = get_load($base);

	echo json_encode($request);
}
?>
