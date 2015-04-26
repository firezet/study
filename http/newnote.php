<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Новая заметка</title>
</head>
<body>
<form method="POST">
Title <input type="text" name="title" maxlength="20"/><br/>
Article <textarea name="article" maxlength="255"></textarea><br/>
<input type="hidden" name="created" value="<?php echo date("Y-m-d");?>"/>
<input type="submit"><br/>
</form>
<a href="/index.php">Главная страница</a>
<?php
$created = $_POST['created'];
$title = $_POST['title'];
$article = $_POST['article'];

if (($created)&&($title)&&($article)) {
	require_once("db.php");
	$query = "INSERT INTO notes (id, created, title, article) VALUES ('', '$created', '$title', '$article')";
	if (mysqli_query($db, $query)) {
		echo "Заметка добавлена";
	}
}
?>
</body>
</html>