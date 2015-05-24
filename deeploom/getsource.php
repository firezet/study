<?php

$filename = "1.mp3";
$filesize = filesize($filename);

$begin = 0;
$end = $filesize - 1;
$offset = $begin;
$length = $end - $offset;

if (isset($_SERVER['HTTP_RANGE'])) {
	preg_match("/bytes=(\d+)-(\d+)?/", $_SERVER["HTTP_RANGE"], $match);
	$offset = intval($match[1]);
	$length = intval($match[2]) - $offset;
	if ($offset < 0) {
		$offset = $begin;
	}
	if ($offset > $filesize) {
		$offset = $begin;
	}
	if ($length <= 0) {
		$length = $end - $offset;
	}
	if ($length > $filesize - $offset) {
		$length = $end - $offset;
	}
	header('HTTP/1.1 206 Partial Content');
	header("Accept-Ranges: bytes");
}

header("Content-Type: audio/mpeg");
header("Content-Length: ".$filesize);
header("Content-Range: bytes ".$offset."-".($offset + $length)."/".$filesize);

if (($offset == $begin) && ($length == $end)) {
	readfile($filename);
} else {
	$file = fopen($filename, "r");
	fseek($file, $offset);
	print(fread($file, $length));
	fclose($file);
}

?>
