 var videos = new Array();
 var titles = new Array();
 var liIDs = new Array();
 var licount = 0;
 var apikey = "";
 $.getJSON("config.json",function(json){
 	var jsonstring = JSON.stringify(json.ytid);
 	apikey = jsonstring.substring(1,jsonstring.length-1);
 });
 $("#enterbutton").click(function(){
 	var link = $("#yt").val();
 	var str = link.substring(32,link.length);
 	$.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + str + "&key=" + apikey, function(data) {
 		var title = JSON.stringify(data.items[0].snippet.title);
 		title = title.substring(1,title.length-1);
 		if(liIDs.length>0){
 			$("#videoqueue").append("<li id='" + licount.toString() + "li'>"+title+"</li>");
 		}
 		else{
 			$("#videoplay").append("<li id='" + licount.toString() + "li'>"+title+"</li>");
 			$("#tube").attr('src',"https://www.youtube.com/embed/"+str+"?autoplay=1");
 		}
 		videos.push(str);
 		titles.push(title);
 		liIDs.push(licount.toString());
 		licount = licount + 1;
 		$("#yt").val("");
 	});
 	

 });
 $("#searchbutton").click(function(){
 	var link = $("#search").val();
 	search(link);
 });
 $(".skip").click(function(){
 	$("#"+liIDs[0]+"li").empty();
 	liIDs.shift();
 	$("#"+liIDs[0]+"li").empty();
 	videos.shift();
 	titles.shift();
 	if(liIDs.length==0){
 		$("#tube").attr('src',"");
 	}
 	else{
 		var videokey = videos[0];
 		$("#tube").attr('src',"https://www.youtube.com/embed/"+videokey+"?autoplay=1");
 		$("#videoplay").append("<li id='" + liIDs[0]+ "li'>"+titles[0]+"</li>");
 	}
 });

function showResponse(response) {
	
	var title = JSON.stringify(response.items[0].snippet.title);
	title = title.substring(1,title.length-1);
	titles.push(title);
	var items = response.items[0].id.videoId;
	var responseString = JSON.stringify(items,'');
	videos.push(responseString.substring(1,responseString.length-1));
	if(liIDs.length>0){
		$("#videoqueue").append("<li id='" + licount + "li'>"+title+"</li>");
	}
	else{
	$("#videoplay").append("<li id='" + licount.toString() + "li'>"+title+"</li>");
 	var url = "https://www.youtube.com/embed/"+responseString.substring(1,responseString.length-1)+"?autoplay=1";
	$("#tube").attr('src',url);
	}
	liIDs.push(licount);
	licount = licount + 1;
	$("#search").val("");

}

function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}


function onYouTubeApiLoad() {
    .
    gapi.client.setApiKey('AIzaSyCWjV83fjIzeWNqnY0oSMw3RYdJwmcYro8');
 
    
}
function search(title){
	var request = gapi.client.youtube.search.list({
		part:'snippet',
		q:String(title),
		type:'video'
	});
	request.execute(onSearchResponse);
}
function onSearchResponse(response){
	showResponse(response);
}
