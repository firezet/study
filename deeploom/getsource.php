<?php

$file = "1.m4a";
header("Accept-Ranges: bytes");
header("Content-length: ".filesize($file));
header("Content-type: audio/mp4");
readfile($file);

?>
