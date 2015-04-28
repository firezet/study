<?php
require_once("function.php");
$search = fill_get('search');
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Поиск</title>
</head>
<body>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" enctype="multipart/form-data" method="GET">
<input type="text" name="search" placeholder="Поиск" value="<?php if (isset($search)) echo $search;?>"/>
<input type="submit"/>
</form>
<?php
if (isset($search)) {
	require_once("db.php");
	$search = str_replace(',', ' ', $search);
	$search = str_replace('.', ' ', $search);
	$search_array = explode(' ', $search);
	foreach ($search_array as $elem) {
		if (isset($elem)) {
			$title_array[] = "title LIKE '%$elem%'";
			$article_array[] = "article LIKE '%$elem%'";
		}
	}
	$search = implode(' OR ', array_merge($title_array, $article_array));
	$result = mysqli_query($db, "SELECT id, created, title, article FROM notes WHERE $search ORDER BY id DESC");
	while ($note = mysqli_fetch_assoc($result)) {
		echo $note['created']."<br>";
		echo $note['title']."<br>";
		echo $note['article']."<br>";
		echo "<a href=\"/comments.php?id=".$note['id']."\">Комментарии</a>
			<a href=\"/editnote.php?id=".$note['id']."\">Редактировать</a>
			<a href=\"/deletenote.php?id=".$note['id']."\">Удалить</a><br/>";
	}
}
?>
<a href="/index.php">Главная страница</a>
</body>
</html>
