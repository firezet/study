<?php

function sec_get($arg) {
	global $db;
	return trim(mysqli_real_escape_string($db, strip_tags($_GET[$arg])));
}

function sec_post($arg) {
	global $db;
	return trim(mysqli_real_escape_string($db, strip_tags($_POST[$arg])));
}

function sec_string($arg) {
	global $db;
	return trim(mysqli_real_escape_string($db, strip_tags($arg)));
}

?>
