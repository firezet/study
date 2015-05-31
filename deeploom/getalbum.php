<?php
require_once("php/get_func.php");

$id = intval(sec_get("id"));
$request = get_album($id);

echo json_encode($request);

?>
