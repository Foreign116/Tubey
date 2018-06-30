<?php
require 'configs/db.inc.php';
$min_id = "SELECT Min( id ) FROM videoId DELETE FROM videoId WHERE ID = $min_id;";
$result = mysqli_query($conn, $sql);

?>