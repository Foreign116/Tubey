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
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '500',
		width: '1140'
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
			$('#searchList').append('<li class="white-text" onclick="onLIClick(this)" value="'+title+'" id="' + videoId + '">• ' + title + '</li>')
		});




	});


}
$('#enterSearch').click(function () {
	$("#searchList").empty();
	search();
	
});


$('#enterYoutubeUrl').click(function(){
	 var youtubeUrl = $("#videoUrl").val();
	 var videoId  = youtubeUrl.substring(youtubeUrl.length-11,youtubeUrl.length);
	 request2 = gapi.client.request({
		'method': 'GET',
		'path': '/youtube/v3/videos',
		'params':{'id': videoId,
					'part': 'snippet'}
	});
	request2.execute(function(response) {
		var title = JSON.stringify(response['items']['0']['snippet']['title']);
		title = title.substring(1, title.length - 1);


			$.ajax({
				type:    "POST",
				url:     "http://tubey-com.stackstaging.com/templates/getVideo.php",
				data:    {
					'youtubeId':videoId,
					'youtubeTitle':title
				},
				success : function(data){
					if(data!=="no data" && data !=="not first video"){
						player.loadVideoById(data);
						player.playVideo();
						
					}
				}
			});
		
	  });
});


  function onLIClick(liElement){
	var title =  $(liElement).text();
	title = title.substring(1,title.length);
	$.ajax({
        type:    "POST",
		url:     "http://tubey-com.stackstaging.com/templates/getVideo.php",
        data:    {
            'youtubeId':liElement.id,
            'youtubeTitle':title
		},
		success : function(data){
			if(data!=="no data" && data !=="not first video"){
				player.loadVideoById(data);
				player.playVideo();
			}
		}
	});
  }
  window.setInterval(function(){
	$("#queueList").load("http://tubey-com.stackstaging.com/templates/updateVideo.php");
	if (player.getPlayerState() === 0) {
		$.ajax({
			type:    "POST",
			url:     "http://tubey-com.stackstaging.com/templates/deleteVideo.php",
			success: function (data){
				if(data != "no data"){
					player.loadVideoById(data);
					player.playVideo();
				}
		}
	});
	}
	if(player.getPlayerState()===5){
		$.ajax({
			type:    "POST",
			url:     "http://tubey-com.stackstaging.com/templates/getVideoCue.php",
			success: function (data){
				if(data != "no data"){
					player.loadVideoById(data);
					player.playVideo();
				}
		}
	});
	}
  }, 2000);



