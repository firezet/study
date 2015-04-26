<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Удалить заметку</title>
</head>
<body>
<?php
require_once("db.php");

$id = $_GET['id'];

$confirm = $_POST['confirm'];
if ($confirm) {
mysqli_query($db, "DELETE FROM notes WHERE id = $id");
}

$query = "SELECT id FROM notes WHERE id = $id";
$result = mysqli_query($db, $query);
if (mysqli_num_rows($result) > 0) {
	?>
<form method="POST">
<input type="checkbox" name="confirm">
<input type="submit"><br/>
</form>
	<?php
} else {
	echo "Заметка удалена или еще не создана<br>";
}
?>
<a href="/index.php">Главная страница</a>
</body>
</html>
