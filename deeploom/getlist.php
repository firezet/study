<?php
require_once("php/connect_db.php");

$request = array();
$query = "SELECT * FROM artists";
$artists = mysqli_query($db, $query);
while ($artist = mysqli_fetch_assoc($artists)) {
	$query = "SELECT * FROM albums WHERE id = ".intval($artist["id"]);
	$albums = mysqli_query($db, $query);
	while ($album = mysqli_fetch_assoc($albums)) {
		$query = "SELECT name FROM genres WHERE id = ".intval($album["genre"]);
		$genres = mysqli_query($db, $query);
		$genre = mysqli_fetch_assoc($genres);
		$query = "SELECT id, number, name, comment, artist FROM tracks WHERE album = ".intval($album["id"]);
		$tracks = mysqli_query($db, $query);
		$requestTracks = array();
		while ($track = mysqli_fetch_assoc($tracks)) {
			if (isset($track["artist"])) {
				$query = "SELECT * FROM artists WHERE id = ".intval($track["artist"]);
				$requestArtists = mysqli_query($db, $query);
				$requestArtist = mysqli_fetch_assoc($requestArtists);
			} else {
				$requestArtist = NULL;
			}
			$requestTracks[] = array(
				"number" => $track["number"],
				"title" => $track["name"],
				"comment" => $track["comment"],
				"artist" => $requestArtist["name"],
				"src" => $track["id"]
			);
		}
		$request[] = array(
			"artist" => $artist["name"],
			"album" => $album["name"],
			"art" => "null",
			"year" => $album["year"],
			"genre" => $genre["name"],
			"tracks" => $requestTracks
		);
	}
}

echo json_encode($request);

?>
