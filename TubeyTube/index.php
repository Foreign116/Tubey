
<?php

require 'templates/configs/db.inc.php';
setcookie('rows', 0, time() + (86400 * 30), "/");
?>


<!DOCTYPE html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<html>

<head>
	<title>Tubey Tube</title>
	<link rel="icon" href="styles/icons/favicon.ico" type="image/gif" sizes="16x16">
	<link rel="stylesheet" type="text/css" href="styles/materialize/css/materialize.min.css">
	<link rel="stylesheet" type="text/css" href="styles/css/styles.css">
</head>

<body class="black">
	<nav style="border-bottom: 1px solid white;margin-bottom: 20px;">
		<div class="nav-wrapper black">
			<a href="#" class="brand-logo white-text flow-text center">Tubey Tube</a>
		</div>
	</nav>
	<div class="row">
		<div class="col s8">
			<div id="player"></div>
			<div id="videoForm">
				<form>
					<div class="row">
						<div class="input-field col s6">
							<input placeholder="Video URL" id="videoUrl" type="text" class="validate white-text flow-text">
							<br>
							<button class="waves-effect waves-light btn white black-text flow-text" type="button" id="enterYoutubeUrl">Enter</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div class="col s4">
			<div id="searchDiv">
				<input placeholder="Youtube Search" id="videoSearch" type="text" class="validate white-text flow-text">
				<br>
				<button class=" waves-effect waves-light btn white black-text flow-text" type="button" id="enterSearch">Search</button>
				<ul id="searchList" style="overflow: auto;height: 300px;"></ul>
			</div>
		</div>
	</div>
	<div class="row" style="margin-left:10px;">
		<div class="col s4">
			<div id="queue">
				<h5 class="flow-text white-text">Queue:</h5>
				<ul id="queueList"></ul>
			</div>
		</div>
	</div>


	<script type="text/javascript" src="scripts/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="scripts/materialize/js/materialize.min.js"></script>
	<script type="text/javascript" src="scripts/js/playerScript.js"></script>
	<script src="https://apis.google.com/js/client.js?onload=onClientLoad"></script>
</body>


</html>