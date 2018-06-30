<?php
require 'configs/db.inc.php';
$sql = "SELECT ytID,title FROM videoId ORDER BY id;";
$result = mysqli_query($conn, $sql);
$num_rows = mysqli_num_rows($result);
$client_num_rows = $_COOKIE['rows'];

while($rows = mysqli_fetch_assoc($result)){
    echo "<li class=white-text id=".$rows['ytID'].">• ".$rows['title']."</li>";
}

setcookie('rows', $num_rows, time() + (86400 * 30), "/");


//$sql = "SELECT ytID FROM videoId ORDER BY id LIMIT 1;";
?>