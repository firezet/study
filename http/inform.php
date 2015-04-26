<!DOCTYPE HTML>
<?php
require_once("db.php");

$allnotes = mysqli_fetch_assoc(mysqli_query($db, "SELECT COUNT(id) AS notes FROM notes"));
$allcomm = mysqli_fetch_assoc(mysqli_query($db, "SELECT COUNT(id) AS comm FROM comments"));

$date_array = getdate();
$begin_date = date("Y-m-d", mktime(0,0,0, $date_array['mon'], 1, $date_array['year']));
$end_date = date("Y-m-d", mktime(0,0,0, $date_array['mon']+1, 0, $date_array['year']));

$monnotes = mysqli_fetch_assoc(mysqli_query($db, "SELECT COUNT(id) AS notes FROM notes WHERE created>='$begin_date' AND created<='$end_date'"));
$moncomm = mysqli_fetch_assoc(mysqli_query($db, "SELECT COUNT(id) AS comm FROM comments WHERE created>='$begin_date' AND created<='$end_date'"));

$lastnote = mysqli_fetch_assoc(mysqli_query($db, "SELECT id, title FROM notes ORDER BY id DESC LIMIT 0,1"));
$mostcomm = mysqli_fetch_assoc(mysqli_query($db, "SELECT notes.id, notes.title FROM comments, notes WHERE comments.art_id=notes.id GROUP BY notes.id ORDER BY COUNT(comments.id) DESC LIMIT 0,1"));
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Информация</title>
</head>
<body>
Полезная информация:<br/>
<hr>
Сделано записей: <?php echo $allnotes['notes'];?><br/>
Оставлено комментариев: <?php echo $allcomm['comm'];?><br/>
За последний месяц я создал записей: <?php echo $monnotes['notes'];?><br/>
За последний месяц оставлено комментариев: <?php echo $moncomm['comm'];?><br/>
Моя последняя запись: <?php echo "<a href=\"/comments.php?id=".$lastnote['id']."\">".$lastnote['title']."</a>"?><br/>
Самая обсуждаемая запись: <?php echo "<a href=\"/comments.php?id=".$mostcomm['id']."\">".$mostcomm['title']."</a>"?><br/>
<br/>
<a href="index.php">На главную страницу сайта</a>
</body>
</html>
