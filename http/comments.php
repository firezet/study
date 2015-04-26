<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Комментарии</title>
</head>
<body>
<?php
require_once("db.php");
$id = $_GET['id'];
$query = "SELECT id, created, author, comment FROM comments WHERE art_id = $id ORDER BY id DESC";
$comments = mysqli_query($db, $query);
if (mysqli_num_rows($comments) > 0) {
	while ($comm = mysqli_fetch_array($comments)) {
		echo $comm['created']."<br>";
		echo $comm['author']."<br>";
		echo $comm['comment']."<br>";
		echo "<a href=\"/editcomment.php?id=".$comm['id']."&art_id=".$id."\">Редактировать</a> ";
		echo "<a href=\"/deletecomment.php?id=".$comm['id']."&art_id=".$id."\">Удалить</a><br/>";
	}
} else {
	echo "Здесь пока никто не оставлял комментариев<br/>";
}
echo "<a href=\"/newcomment.php?id=$id\">Добавить новый комментарий</a><br/>"
?>
<a href="/index.php">Главная страница</a>
</body>
</html>
