<?php
require 'configs/db.inc.php';
$min_id = "DELETE FROM videoId ORDER BY id LIMIT 1;";
$result = mysqli_query($conn, $min_id);
$num_of_cookies = $_COOKIE['rows'];
setcookie('rows', $num_of_cookies-1, time() + (86400 * 30), "/");
?>