<?php
$host = "localhost";
$select_db = "sitedb";
$user = "admin";
$pass = "1";
$db = mysqli_connect($host, $user, $pass) or trigger_error(mysql_error(),E_USER_ERROR);
mysqli_select_db($db, $select_db);
?>