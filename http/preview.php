<?php

$name = ltrim($_GET['name'], "./ ");
$file = "photo/" . $name;
$preview = "photo/preview/" . $name;

if (!file_exists($preview)) {
    if (file_exists($file)) {
        $image = new Imagick($file);
        $image->setImageBackgroundColor('rgb(255, 255, 255)');
        $image->setImageAlphaChannel(Imagick::ALPHACHANNEL_REMOVE);
        $image->thumbnailImage(100, 100, true, true);
        $image->setImageCompressionQuality(50);
        $image->setImageFormat('jpg');
        $image->writeImage("jpg:".$preview);
    } else {
        exit;
    }
}

if (file_exists($preview)) {
    header("Content-type: image/jpg");
    readfile($preview);
} else {
    exit;
}

?>
