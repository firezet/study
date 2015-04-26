<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Новый комментарий</title>
</head>
<body>
<form method="POST">
Author <input type="text" name="author" maxlength="20"/><br/>
Comment <textarea name="comment" maxlength="255"></textarea><br/>
<input type="hidden" name="created" value="<?php echo date("Y-m-d");?>"/>
<input type="submit"><br/>
</form>
<a href="/comments.php?id=<?php echo $_GET['id'];?>">К комментариям</a><br/>
<a href="/index.php">Главная страница</a>
<?php
$id = $_GET['id'];
$created = $_POST['created'];
$author = $_POST['author'];
$comment = $_POST['comment'];

if (($created)&&($author)&&($comment)) {
	require_once("db.php");
	$query = "INSERT INTO comments (id, created, author, comment, art_id) VALUES ('', '$created', '$author', '$comment', '$id')";
	if (mysqli_query($db, $query)) {
		echo "Комментарий добавлен";
	}
}
?>
</body>
</html>
