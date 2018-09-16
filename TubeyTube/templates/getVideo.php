<?php
require 'configs/db.inc.php';
$ytid = $_POST['youtubeId'];
$youtubeId = mysqli_real_escape_string($conn, $_POST['youtubeId']);
$title = mysqli_real_escape_string($conn, $_POST['youtubeTitle']);
$sql = "INSERT INTO videoId(ytID,title) VALUES('$youtubeId', '$title');";
$result = mysqli_query($conn, $sql);
$sql = "SELECT ytID,title FROM videoId ORDER BY id;";
$result = mysqli_query($conn,$sql);
$result_length = mysqli_num_rows($result);
if($result_length===1){
    echo $ytid;
}
else if($result_length > 1){
    echo "not first video";
}
else{
    echo "no data";
}

?>