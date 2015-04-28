<?php require_once("function.php");?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Редактировать заметку</title>
</head>
<body>
<?php
$id = fill_get('id');

if (isset($id)) {
	require_once("db.php");
	if ($_SERVER['REQUEST_METHOD'] == "POST") {
		$title = fill_post('title');
		$article = fill_post('article');
		if (($title)&&($article)) {
			$query = "UPDATE notes SET title = '$title', article = '$article' WHERE id = $id";
			if (mysqli_query($db, $query)) {
				echo "Заметка обновлена";
			}
		}
	}

	$notes = mysqli_query($db, "SELECT title, article FROM notes WHERE id = $id");
	$note = mysqli_fetch_assoc($notes);
	mysqli_free_result($notes);
	$title = $note['title'];
	$article = $note['article'];
}

?>
<form action="<?php echo $_SERVER['REQUEST_URI'];?>" enctype="multipart/form-data" method="POST">
Title <input type="text" name="title" maxlength="20" value="<?php echo $title;?>"/><br/>
Article <textarea name="article" maxlength="255"><?php echo $article;?></textarea><br/>
<input type="submit"><br/>
</form>
<a href="/index.php">Главная страница</a>
</body>
</html>
