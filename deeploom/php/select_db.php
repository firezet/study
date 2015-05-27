<?php

$mysql_host = "localhost";
$mysql_db = "music_db";
$mysql_user = "music_user";
$db = mysqli_connect($mysql_host, $mysql_user);
mysqli_select_db($db, $mysql_db);

require_once("sec.php");

?>
