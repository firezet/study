<?php
require_once("php/select_db.php");

if (isset($_GET["id"])) {
	$id = intval(sec_get("id"));
} else {
	$id = 0;
}

$content = "audio/mp4";
$ext = ".m4a";

if (isset($_GET["name"])) {
	if ($_GET["name"] == "null.ogg") {
		$content = "audio/ogg";
		$ext = ".ogg";
	}
}

$query = "SELECT album, number FROM tracks WHERE id = ".$id;
$track = mysqli_query($db, $query);
$array = mysqli_fetch_assoc($track);

if (isset($array["album"]) && isset($array["number"])) {
	$src = "music/".$array["album"]."/".$array["number"].$ext;
	if (file_exists($src)) {
		header("Content-Type: ".$content);
		header("X-Accel-Redirect: /".$src);
		exit;
	}
}

header("HTTP/1.0 404 Not Found");

?>
