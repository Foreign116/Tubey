<?php
require 'configs/db.inc.php';
$title = mysqli_real_escape_string($conn, $_POST['youtubeId']);
$youtubeId = mysqli_real_escape_string($conn, $_POST['youtubeTitle']);
$sql = "INSERT INTO videoId (ytID, title) VALUES ($youtubeId, $title);";
$result = mysqli_query($conn, $sql);
?>