<?php require_once("function.php");?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Новая заметка</title>
</head>
<body>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" enctype="multipart/form-data" method="POST">
Title <input type="text" name="title" maxlength="20"/><br/>
Article <textarea name="article" maxlength="255"></textarea><br/>
<input type="hidden" name="created" value="<?php echo date("Y-m-d");?>"/>
<input type="submit"><br/>
</form>
<a href="/index.php">Главная страница</a>
<?php

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	require_once("db.php");
	$created = fill_post('created');
	$title = fill_post('title');
	$article = fill_post('article');
	if (($created)&&($title)&&($article)) {
		$query = "INSERT INTO notes (id, created, title, article) VALUES ('', '$created', '$title', '$article')";
		if (mysqli_query($db, $query)) {
			echo "Заметка добавлена";
		}
	}
}
?>
</body>
</html>
