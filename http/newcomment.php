<?php require_once("function.php");?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Новый комментарий</title>
</head>
<body>
<form action="<?php echo $_SERVER['REQUEST_URI'];?>" enctype="multipart/form-data" method="POST">
Author <input type="text" name="author" maxlength="20"/><br/>
Comment <textarea name="comment" maxlength="255"></textarea><br/>
<input type="hidden" name="created" value="<?php echo date("Y-m-d");?>"/>
<input type="submit"><br/>
</form>
<a href="/comments.php?id=<?php echo fill_get('id');?>">К комментариям</a><br/>
<a href="/index.php">Главная страница</a>
<?php
$id = fill_get('id');

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	require_once("db.php");
	$created = fill_post('created');
	$author = fill_post('author');
	$comment = fill_post('comment');
	if (($created)&&($author)&&($comment)) {
		$query = "INSERT INTO comments (id, created, author, comment, art_id) VALUES ('', '$created', '$author', '$comment', '$id')";
		if (mysqli_query($db, $query)) {
			echo "Комментарий добавлен";
		}
	}
}
?>
</body>
</html>
