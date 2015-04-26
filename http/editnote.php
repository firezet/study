<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Редактировать заметку</title>
</head>
<body>
<?php
require_once("db.php");

$id = $_GET['id'];
$title = $_POST['title'];
$article = $_POST['article'];

if (($title)&&($article)) {
	$query = "UPDATE notes SET title = '$title', article = '$article' WHERE id = $id";
	if (mysqli_query($db, $query)) {
		echo "Заметка обновлена";
	}
}

$notes = mysqli_query($db, "SELECT title, article FROM notes WHERE id = $id");
$note = mysqli_fetch_array($notes);
$title = $note['title'];
$article = $note['article'];

?>
<form method="POST">
Title <input type="text" name="title" maxlength="20" value="<?php echo $title;?>"/><br/>
Article <textarea name="article" maxlength="255"><?php echo $article;?></textarea><br/>
<input type="submit"><br/>
</form>
<a href="/index.php">Главная страница</a>
</body>
</html>