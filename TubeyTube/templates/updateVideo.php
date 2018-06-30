<?php
require 'configs/db.inc.php';
$sql = "SELECT ytID,title FROM videoId ORDER BY id;";
$result = mysqli_query($conn, $sql);
$num_rows = mysqli_num_rows($result);
$client_num_rows = $_COOKIE['rows'];

if ($num_rows != $client_num_rows){
    $_COOKIE['rows'] = $num_rows;
    while($rows = mysqli_fetch_assoc($result)){
        echo "<li class=white-text id=".$rows['ytID'].">• ".$rows['title']."</li>";
    }
}
//$sql = "SELECT ytID FROM videoId ORDER BY id LIMIT 1;";
?>