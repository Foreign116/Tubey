<?php
require 'configs/db.inc.php';
$min_id = "DELETE FROM videoId ORDER BY id LIMIT 1;";
$result = mysqli_query($conn, $min_id);

?>