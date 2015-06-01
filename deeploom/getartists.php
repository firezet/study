<?php
require_once("php/get_func.php");

$name = sec_get("name");
$request = get_search("artists", $name);

echo json_encode($request);

?>
