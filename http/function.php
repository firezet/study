<?php

function fill_get($arg) {
	return trim(mysql_real_escape_string(strip_tags($_GET[$arg])));
}

function fill_post($arg) {
	return trim(mysql_real_escape_string(strip_tags($_POST[$arg])));
}

?>
