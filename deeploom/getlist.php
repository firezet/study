<?php

$request = array();
for ($x = 0; $x < 5; $x++) {
	$tracks = array();
	for ($y = 0; $y < 10; $y++) {
		$tracks[] = array(
			"number" => $x.$y,
			"title" => "title".$y,
			"artist" => "artist".$x.$y,
			"src" => $x.$y
		);
	}
	$request[] = array(
		"artist" => "artist".$x,
		"album" => "album".$x,
		"art" => "art".$x,
		"year" => "200".$x,
		"genre" => "genre".$x,
		"tracks" => $tracks
	);
}

echo json_encode($request);

?>
