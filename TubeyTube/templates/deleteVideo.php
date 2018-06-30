<?php
require 'configs/db.inc.php';
$num_of_cookies = $_COOKIE['rows'] - 1;
setcookie('rows', $num_of_cookies, time() + (86400 * 30), "/");
$min_id = "DELETE FROM videoId ORDER BY id LIMIT 1;";
$result = mysqli_query($conn, $min_id);

?>