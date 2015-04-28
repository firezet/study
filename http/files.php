<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Файлы</title>
</head>
<body>
<h1>Это страница работы с файлами</h1>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" enctype="multipart/form-data" method="POST">
<input type="file" name="file"/>
<input type="submit"/>
</form>
<?php
$files_dir = opendir($_SERVER['DOCUMENT_ROOT'] . "/files");
$files_array = null;
$files_count = 0;

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	if (isset($_FILES['file']['tmp_name'])) {
		move_uploaded_file($_FILES['file']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/files/" . $_FILES['file']['name']);
	}
	if (isset($_POST['delete'])) {
		unlink($_SERVER['DOCUMENT_ROOT'] . "/files/" . $_POST['delete']);
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
		echo "<p><a href=\"/files/". $file_name ."\" target=\"_blank\">". $file_name ."</a>";
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
