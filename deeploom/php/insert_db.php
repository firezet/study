<?php

$mysql_host = "localhost";
$mysql_db = "music_db";
$mysql_user = "music_add";
$mysql_pass = "pass";
$db = mysqli_connect($mysql_host, $mysql_user, $mysql_pass);
mysqli_select_db($db, $mysql_db);

require_once("sec.php");

?>
