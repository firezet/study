<?php
require_once("php/select_db.php");

function all_by_id($table, $field, $id) {
	global $db;
	$return = array();
	$query = "SELECT * FROM ".sec_string($table)." WHERE ".sec_string($field)." = ".intval($id);
	$results = mysqli_query($db, $query);
	while ($result = mysqli_fetch_assoc($results)) {
		$return[] = $result;
	}
	mysqli_free_result($results);
	return $return;
}

function albums_by_artist($id) {
	$albumsid = all_by_id("albumartist", "artistid", $id);
	$albums = array();
	for ($x = 0; $x < count($albumsid); $x++) {
		$album = all_by_id("albums", "id", $albumsid[$x]["albumid"]);
		for ($y = 0; $y < count($album); $y++) {
			$albums[] = $album[$y];
		}
	}
	return $albums;
}

function artists_by_album($id) {
	$artistsid = all_by_id("albumartist", "albumid", $id);
	$artists = array();
	for ($x = 0; $x < count($artistsid); $x++) {
		$artist = all_by_id("artists", "id", $artistsid[$x]["artistid"]);
		for ($y = 0; $y < count($artist); $y++) {
			$artists[] = $artist[$y];
		}
	}
	return $artists;
}

function tracks_by_artist($id) {
	$tracksid = all_by_id("trackartist", "artistid", $id);
	$tracks = array();
	for ($x = 0; $x < count($tracksid); $x++) {
		$track = all_by_id("tracks", "id", $tracksid[$x]["trackid"]);
		for ($y = 0; $y < count($track); $y++) {
			$tracks[] = $track[$y];
		}
	}
	return $tracks;
}

function artists_by_track($id) {
	$artistsid = all_by_id("trackartist", "trackid", $id);
	$artists = array();
	for ($x = 0; $x < count($artistsid); $x++) {
		$artist = all_by_id("artists", "id", $artistsid[$x]["artistid"]);
		for ($y = 0; $y < count($artist); $y++) {
			$artists[] = $artist[$y];
		}
	}
	return $artists;
}

function genre_by_id($id) {
	$genre = NULL;
	$genreList = all_by_id("genres", "id", $id);
	if (count($genreList) > 0) {
		$genre = $genreList[0]["name"];
	}
	return $genre;
}

function tracks_by_album($id) {
	$tracks = array();
	$tracksList = all_by_id("tracks", "album", $id);
	for ($x = 0; $x < count($tracksList); $x++) {
		$tracksList[$x]["artists"] = artists_by_track($tracksList[$x]["id"]);
		$tracks[] = $tracksList[$x];
	}
	return $tracks;
}

$request = array();
$query = "SELECT * FROM albums ORDER BY year DESC";
$albums = mysqli_query($db, $query);
while ($album = mysqli_fetch_assoc($albums)) {
	$artists = artists_by_album($album["id"]);
	$genre = genre_by_id($album["genre"]);
	$tracks = tracks_by_album($album["id"]);
	$request[] = array(
		"artists" => $artists,
		"id" => $album["id"],
		"name" => $album["name"],
		"year" => $album["year"],
		"genre" => $genre,
		"tracks" => $tracks
	);
}

echo json_encode($request);

?>
