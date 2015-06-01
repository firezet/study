<?php
require_once("php/get_func.php");

$name = sec_get("name");
$request = get_search("albums", $name);

echo json_encode($request);

?>
