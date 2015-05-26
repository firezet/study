<?php

$mysql_host = "localhost";
$mysql_db = "music_db";
$mysql_user = "music_user";
$db = mysqli_connect($mysql_host, $mysql_user);
mysqli_select_db($db, $mysql_db);

function sec_get($arg) {
	global $db;
	return trim(mysqli_real_escape_string($db, strip_tags($_GET[$arg])));
}

function sec_post($arg) {
	global $db;
	return trim(mysqli_real_escape_string($db, strip_tags($_POST[$arg])));
}

?>
