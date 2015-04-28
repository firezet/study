<?php require_once("function.php");?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Редактировать комментарий</title>
</head>
<body>
<?php
$id = fill_get('id');
$art_id = fill_get('art_id');

if (isset($id)) {
	require_once("db.php");
	if ($_SERVER['REQUEST_METHOD'] == "POST") {
		$author = fill_post('author');
		$comment = fill_post('comment');
		if (($author)&&($comment)) {
			$query = "UPDATE comments SET author = '$author', comment = '$comment' WHERE id = $id";
			if (mysqli_query($db, $query)) {
				echo "Заметка обновлена";
			}
		}
	}

	$notes = mysqli_query($db, "SELECT author, comment FROM comments WHERE id = $id");
	$note = mysqli_fetch_assoc($notes);
	mysqli_free_result($notes);
	$author = $note['author'];
	$comment = $note['comment'];
}

?>
<form action="<?php echo $_SERVER['REQUEST_URI'];?>" enctype="multipart/form-data" method="POST">
Title <input type="text" name="author" maxlength="20" value="<?php echo $author;?>"/><br/>
Article <textarea name="comment" maxlength="255"><?php echo $comment;?></textarea><br/>
<input type="submit"><br/>
</form>
<a href="comments.php?id=<?php echo $art_id;?>">К комментариям</a><br/>
<a href="/index.php">Главная страница</a>
</body>
</html>
