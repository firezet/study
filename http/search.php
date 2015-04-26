<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Поиск</title>
</head>
<body>
<form method="GET">
<input type="text" name="search"/>
<input type="submit"/>
</form>
<?php
$search = $_GET['search'];
if ($search) {
	require_once("db.php");
	$search = str_replace(',', ' ', $search);
	$search = str_replace('.', ' ', $search);
	$search_array = explode(' ', $search);
	foreach ($search_array as $elem) {
		if ($elem) {
			$title_array[] = "title LIKE '%$elem%'";
			$article_array[] = "article LIKE '%$elem%'";
		}
	}
	$search = implode(' OR ', array_merge($title_array, $article_array));
	$result = mysqli_query($db, "SELECT title, article FROM notes WHERE $search ORDER BY id DESC");
	while ($note = mysqli_fetch_array($result)) {
		echo $note['title']."<br>";
		echo $note['article']."<br>";
	}
}
?>
</body>
</html>
