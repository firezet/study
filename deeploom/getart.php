<?php


$src = "img/album.svg";
$content = "image/svg+xml";

if (isset($_GET["id"])) {
	$id = intval($_GET["id"]);
	$path = "music/".$id."/folder.jpg";
	if (file_exists($path)) {
		$src = $path;
		$content = "image/jpeg";
	}
}

header("Content-Type: ".$content);
header("X-Accel-Redirect: /".$src);

?>
