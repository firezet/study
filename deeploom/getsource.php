<?php
require_once("php/connect_db.php");

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

$query = "SELECT src FROM tracks WHERE id = ".$id;
$track = mysqli_query($db, $query);
$array = mysqli_fetch_assoc($track);

http_response_code(404);

if (isset($array["src"])) {
	$src = "music/".$array["src"].$ext;
	if (file_exists($src)) {
		http_response_code(200);
		header("Content-Type: ".$content);
		header('X-Accel-Redirect: /'.$src);
	}
}

?>
