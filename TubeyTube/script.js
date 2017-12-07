 var videos = new Array();
 var titles = new Array();
 var liIDs = new Array();
 var licount = 0;
 var apikey = 'AIzaSyCWjV83fjIzeWNqnY0oSMw3RYdJwmcYro8';
 $("#enterbutton").click(function(){
 	var link = $("#yt").val();
 	var str = link.substring(32,link.length);
 	videos.push(str);
 	$.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + str + "&key=" + apikey, function(data) {
 		var title = JSON.stringify(data.items[0].snippet.title);
 		title = title.substring(1,title.length-1);
 		titles.push(title);
 		if(liIDs.length>0){
 			$("#videoqueue").append("<li id='" + licount + "li'>"+title+"</li>");
 		}
 		liIDs.push(licount);
 		licount = licount + 1;
 	});
 	$("#tube").attr('src',"https://www.youtube.com/embed/"+str+"?autoplay=1");

 });
 $("#searchbutton").click(function(){
 	var link = $("#search").val();
 	search(link);
 });
 $(".skip").click(function(){
 	var key = liIDs.pop();
 	$("#"+key+"li").empty();
 	if(liIDs.length==0){
 		$("#tube").attr('src',"");
 	}
 	else{
 		videos.pop();
 		var videokey = videos[videos.length-1];
 		$("#tube").attr('src',"https://www.youtube.com/embed/"+videokey+"?autoplay=1");
 	}
 });
// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
	//var responseStrings = JSON.stringify(response,'',2);
	var title = JSON.stringify(response.items[0].snippet.title);
	title = title.substring(1,title.length-1);
	titles.push(title);
	var items = response.items[0].id.videoId;
	var responseString = JSON.stringify(items,'');
	videos.push(responseString.substring(1,responseString.length-1));
	if(liIDs.length>0){
		$("#videoqueue").append("<li id='" + licount + "li'>"+title+"</li>");
	}
	liIDs.push(licount);
	licount = licount + 1;
	var url = "https://www.youtube.com/embed/"+responseString.substring(1,responseString.length-1)+"?autoplay=1";
	$("#tube").attr('src',url);

}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See https://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyCWjV83fjIzeWNqnY0oSMw3RYdJwmcYro8');
    //search();
    // Add code here to test out showResponse():
    
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
