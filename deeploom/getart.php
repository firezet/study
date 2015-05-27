<?php

$file = "img/album.svg";
header("Accept-Ranges: bytes");
header("Content-length: ".filesize($file));
header("Content-Type: image/svg+xml");
readfile($file);

?>
