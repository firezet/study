<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Редактировать комментарий</title>
</head>
<body>
<?php
require_once("db.php");

$id = $_GET['id'];
$art_id = $_GET['art_id'];
$author = $_POST['author'];
$comment = $_POST['comment'];

if (($author)&&($comment)) {
	$query = "UPDATE comments SET author = '$author', comment = '$comment' WHERE id = $id";
	if (mysqli_query($db, $query)) {
		echo "Заметка обновлена";
	}
}

$notes = mysqli_query($db, "SELECT author, comment FROM comments WHERE id = $id");
$note = mysqli_fetch_array($notes);
$author = $note['author'];
$comment = $note['comment'];

?>
<form method="POST">
Title <input type="text" name="author" maxlength="20" value="<?php echo $author;?>"/><br/>
Article <textarea name="comment" maxlength="255"><?php echo $comment;?></textarea><br/>
<input type="submit"><br/>
</form>
<a href="comments.php?id=<?php echo $art_id;?>">К комментариям</a><br/>
<a href="/index.php">Главная страница</a>
</body>
</html>
