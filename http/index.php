<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>MyTravelNotes</title>
</head>
<body>
<nav style="float:right">
<form action="/search.php" enctype="multipart/form-data" method="GET">
<input type="text" name="search" placeholder="Поиск"/>
<input type="submit" value="Поиск"/>
</form>
<a>Войти</a><br/>
<a href="/newnote.php">Новая запись</a><br/>
<a>Отправить сообщение</a><br/>
<a href="/photo.php">Фото</a><br/>
<a href="/files.php">Файлы</a><br/>
<a>Администрация</a><br/>
<a href="/inform.php">Информация</a><br/>
<a>Выйти</a><br/>
</nav>
<article>
Рад приветствовать вас на страницах моего сайта, посвященного путеществиям! Здесь я буду рассказывать о своих путешествиях и выкладывать разные интересные материалы.<br/>
<?php
require_once("db.php");
$notes = mysqli_query($db, "SELECT * FROM notes ORDER BY id DESC");
if (!$notes) {
	echo "error";
}
while ($note = mysqli_fetch_assoc($notes)) {
	echo $note['created']."<br>";
	echo $note['title']."<br>";
	echo $note['article']."<br>";
	echo "<a href=\"/comments.php?id=".$note['id']."\">Комментарии</a>
			<a href=\"/editnote.php?id=".$note['id']."\">Редактировать</a>
			<a href=\"/deletenote.php?id=".$note['id']."\">Удалить</a><br/>";
}
?>
</article>
</body>
</html>
