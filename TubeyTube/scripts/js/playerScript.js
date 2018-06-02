var player;
var apikey;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$.getJSON("templates/configs/config.json", function (json) {
	var jsonstring = JSON.stringify(json.ytid);
	apikey = jsonstring.substring(1, jsonstring.length - 1);
});

function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
function onYouTubeApiLoad() {

	gapi.client.setApiKey(apikey);

}
function onPlayerReady(event) {
	event.target.playVideo();
}
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.ENDED) {

		if (liIDs.length == 0) {
			player.loadVideoById("tp1ZluX4aYs", 0);
		}
		else {

		}
	}
}
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '500',
		width: '1140',
		videoId: 'tp1ZluX4aYs',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function search() {
	var q = $('#videoSearch').val();
	var request = gapi.client.youtube.search.list({
		q: q,
		part: 'snippet',
		type: 'video',
		maxResults: 50
	});

	request.execute(function (response) {
		response['items'].forEach(function (video) {
			var videoId = JSON.stringify(video['id']['videoId']).substring(1, 12);
			var title = JSON.stringify(video['snippet']['title']);
			title = title.substring(1, title.length - 1);
			$('#searchList').append('<li class="white-text" id="' + videoId + '">• ' + title + '<li>')

		});




	});


}
$('#enterSearch').click(function () {
	$("#searchList").empty();
	search();
});