<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Фото</title>
</head>
<body>
<h1>Это страница работы с изображениями</h1>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" enctype="multipart/form-data" method="POST">
<input type="file" name="photo"/>
<input type="submit"/>
</form>
<?php
$files_dir = opendir($_SERVER['DOCUMENT_ROOT'] . "/photo");
$files_array = null;
$files_count = 0;

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if (isset($_FILES['photo']['tmp_name'])) {
		if (fnmatch("image/*", $_FILES['photo']['type'])) {
	                move_uploaded_file($_FILES['photo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/photo/" . $_FILES['photo']['name']);
		}
	}
	if (isset($_POST['delete'])) {
		unlink($_SERVER['DOCUMENT_ROOT'] . "/photo/" . $_POST['delete']);
	}
}

while (($file_path = readdir($files_dir)) !== false) {
	if (($file_path != ".") && ($file_path != "..")) {
		$files_array[$files_count] = basename($file_path);
		$files_count++;
	}
}

closedir($files_dir);

if ($files_count > 0) {
	echo "<hr/>";

	sort($files_array);
	foreach ($files_array as $file_name) {
		echo "<a href=\"/photo/". $file_name ."\" target=\"_blank\"><img src=\"/photo/". $file_name ."\" width=\"100\" height=\"100\"/></a> ";
	}

	echo "<hr/>";
	?>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" enctype="multipart/form-data" method="POST">
Файл <select name="delete" size="1">
<?php
foreach ($files_array as $file_name) {
	echo "<option>" . $file_name . "</option>";
}
?>
</select>
<input type="submit"/>
</form>
	<?php
}

?>
<a href="/index.php">Главная страница</a>
</body>
</html>
