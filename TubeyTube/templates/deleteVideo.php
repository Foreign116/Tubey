<?php
require 'configs/db.inc.php';
$min_id = "DELETE FROM videoId ORDER BY id LIMIT 1;";
$result = mysqli_query($conn, $min_id);
$get_next_video = "SELECT ytID,title FROM videoId ORDER BY id;";
$result = mysqli_query($get_next_video);
$rows = mysqli_fetch_assoc($result);
$result_length = mysqli_num_rows($result);
if($result_length>0){
    echo $rows['ytID'];
}
else{
    echo "no data";
}
?>