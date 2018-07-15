<?php
require 'configs/db.inc.php';
$sql = "SELECT ytID,title FROM videoId ORDER BY id;";
$result = mysqli_query($conn, $sql);
while($rows = mysqli_fetch_assoc($result)){
    echo "<li class=white-text id=".$rows['ytID'].">• ".$rows['title']."</li>";
}

?>