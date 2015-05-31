<?php
require_once("select_db.php");

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

function track_by_id($id) {
	global $db;
	$query = "SELECT * FROM tracks WHERE id = ".intval($id);
	$tracks = mysqli_query($db, $query);
	$track = mysqli_fetch_assoc($tracks);
	if (isset($track)) {
		$track["artists"] = artists_by_track($track["id"]);
	}
	mysqli_free_result($tracks);
	return $track;
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

function sort_by_field($array, $field) {
	$sort = array();
	foreach ($array as $key => $row)
	{
		$sort[$key] = $row[$field];
	}
	array_multisort($sort, SORT_ASC, $array);
	return $array;
}

function get_track($id) {
	$request = array();
	if ($id > 0) {
		$track = track_by_id($id);
		if (isset($track)) {
			$tracks = array();
			$tracks[] = $track;
			$albums = all_by_id("albums", "id", $track["album"]);
			for ($x = 0; $x < count($albums); $x++) {
				$artists = artists_by_album($albums[$x]["id"]);
				$genre = genre_by_id($albums[$x]["genre"]);
				$request[] = array(
					"artists" => $artists,
					"id" => $albums[$x]["id"],
					"name" => $albums[$x]["name"],
					"year" => $albums[$x]["year"],
					"genre" => $genre,
					"tracks" => $tracks
				);
			}
		}
	}
	return $request;
}

function get_album($id) {
	$request = array();
	if ($id > 0) {
		$albums = all_by_id("albums", "id", $id);
		for ($x = 0; $x < count($albums); $x++) {
			$artists = artists_by_album($albums[$x]["id"]);
			$genre = genre_by_id($albums[$x]["genre"]);
			$tracks = tracks_by_album($albums[$x]["id"]);
			$tracks = sort_by_field($tracks, "number");
			$request[] = array(
				"artists" => $artists,
				"id" => $albums[$x]["id"],
				"name" => $albums[$x]["name"],
				"year" => $albums[$x]["year"],
				"genre" => $genre,
				"tracks" => $tracks
			);
		}
	}
	return $request;
}

function get_artist($id) {
	$request = array();
	if ($id > 0) {
		$albums = albums_by_artist($id);
		for ($x = 0; $x < count($albums); $x++) {
			$request[] = get_album($albums[$x]["id"])[0];
		}
		$tracks = tracks_by_artist($id);
		for ($x = 0; $x < count($tracks); $x++) {
			$request[] = get_track($tracks[$x]["id"])[0];
		}
	}
	return $request;
}

function get_maximum() {
	global $db;
	$query = "SELECT COUNT(*) AS id FROM tracks";
	$results = mysqli_query($db, $query);
	while ($result = mysqli_fetch_assoc($results)) {
		return intval($result["id"]);
	}
	return 0;
}

function get_random($count) {
	global $db;
	$request = array();
	$maximum = get_maximum();
	if ($count > $maximum) {
		$count = $maximum;
	}
	$query = "SELECT id FROM tracks ORDER BY RAND() LIMIT ".$count;
	$results = mysqli_query($db, $query);
	while ($result = mysqli_fetch_assoc($results)) {
		$request[] = get_track($result["id"])[0];
	}
	return $request;
}

?>
