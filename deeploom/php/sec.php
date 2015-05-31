<?php

function sec_get($arg) {
	global $db;
	if (isset($_GET[$arg])) {
		return trim(mysqli_real_escape_string($db, strip_tags($_GET[$arg])));
	}
	return NULL;
}

function sec_post($arg) {
	global $db;
	if (isset($_POST[$arg])) {
		return trim(mysqli_real_escape_string($db, strip_tags($_POST[$arg])));
	}
	return NULL;
}

function sec_string($arg) {
	global $db;
	return trim(mysqli_real_escape_string($db, strip_tags($arg)));
}

?>
