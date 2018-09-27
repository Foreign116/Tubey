<?php
require 'configs/db.inc.php';
$sql = "SELECT ytID,title FROM videoId ORDER BY id;";
$result = mysqli_query($conn, $sql);
$result_length = mysqli_num_rows($result);
if($result_length!=1){
    $pass_first = 0;
    while($rows = mysqli_fetch_assoc($result)){
        if($pass_first!=0){
            echo "<li class=white-text id=".$rows['ytID'].">• ".$rows['title']."</li>";
        }
        $pass_first = $pass_first + 1;
    }
}
else{
    $pass_first = 0;
    while($rows = mysqli_fetch_assoc($result)){
        if($pass_first!=0){
            echo "<li class=white-text id=".$rows['ytID'].">• ".$rows['title']."</li>";
        }
        $pass_first = $pass_first + 1;
    }
}

?>