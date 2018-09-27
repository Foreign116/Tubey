<?php
require 'configs/db.inc.php';
$sql = "SELECT ytID,title FROM videoId ORDER BY id;";
$result = mysqli_query($conn,$sql);
$result_length = mysqli_num_rows($result);
$rows = mysqli_fetch_assoc($result);
if($result_length===1){
    echo $rows['ytID'];
}
else if($result_length > 1){
    echo "not first video";
}
else{
    echo "no data";
}

?>