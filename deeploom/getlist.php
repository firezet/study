<?php
require_once("php/select_db.php");

$request = array();
$query = "SELECT * FROM artists ORDER BY name ASC";
$artists = mysqli_query($db, $query);
while ($artist = mysqli_fetch_assoc($artists)) {
	$query = "SELECT * FROM albums WHERE id = ".intval($artist["id"]." ORDER BY year ASC");
	$albums = mysqli_query($db, $query);
	while ($album = mysqli_fetch_assoc($albums)) {
		$query = "SELECT name FROM genres WHERE id = ".intval($album["genre"]);
		$genres = mysqli_query($db, $query);
		$genre = mysqli_fetch_assoc($genres);
		$query = "SELECT id, number, name, comment, artist FROM tracks WHERE album = ".intval($album["id"]." ORDER BY number ASC");
		$tracks = mysqli_query($db, $query);
		$requestTracks = array();
		while ($track = mysqli_fetch_assoc($tracks)) {
			$requestArtist = NULL;
			if (isset($track["artist"])) {
				$query = "SELECT * FROM artists WHERE id = ".intval($track["artist"]);
				$requestArtists = mysqli_query($db, $query);
				$requestArtist = mysqli_fetch_assoc($requestArtists);
			}
			$requestTracks[] = array(
				"number" => $track["number"],
				"title" => $track["name"],
				"comment" => $track["comment"],
				"artist" => $requestArtist["name"],
				"trackid" => $track["id"]
			);
		}
		$request[] = array(
			"artist" => $artist["name"],
			"album" => $album["name"],
			"albumid" => $album["id"],
			"art" => "null",
			"year" => $album["year"],
			"genre" => $genre["name"],
			"tracks" => $requestTracks
		);
	}
}

echo json_encode($request);

?>
