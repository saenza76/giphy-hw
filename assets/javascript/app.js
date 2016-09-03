var tvShowsArr = ['Family+Guy', 'Southpark', 'American+Dad', 'Pokemon', 'Game+of+Thrones', 'Breaking+Bad', 'Scandal', 'SportsCenter', 'Bobs+Burgers', 'Narcos', 'Full+House', 'Spongebob+Squarepants', 'Better+Call+Saul', 'Dragon+Ball+Z'];
var buttonsHTML = '';
var newShowValue;
var newButton;
var searchShow;
var queryURL;
var apiKey = "&api_key=dc6zaTOxFJmzC";
var gifArr = [];



function generateButtons() {
	for (var i = 0; i < tvShowsArr.length; i++) {
		buttonsHTML += '<button class="btn btn-primary tvshow-buttons" data-show=' + tvShowsArr[i] + '>' + tvShowsArr[i] + '</button>';
	}
	$('#tv-buttons-here').html(buttonsHTML);
}

$(document).ready(function(){

	generateButtons();

	$('body').on('click', '#add-show', function(event) {
		newShowValue = $('#tvshow-input').val().trim();
		newButton = '<button class="btn btn-primary tvshow-buttons" data-show=' + newShowValue + '>' + newShowValue + '</button>';
		$('#tv-buttons-here').append(newButton);
		return false;
	});

	$('body').on('click', '.tvshow-buttons', function(event) {
		$('.gifs-here').empty();
		searchShow = $(this).attr('data-show');
		queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchShow + '&limit=10' + apiKey;
		$.ajax({url: queryURL, method: 'GET'})
			.done(function(response) {
				console.log(response.data);
				for (var i = 0; i < response.data.length; i++) {
					console.log(response.data[i]);
                    $('.gifs-here').append("<div class='outer-container'><p class='title'>Rating: "+ response.data[i].rating.toUpperCase() +"</p><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    gifArr.push(response.data[i].images.downsized.url);
				}
			});
	});

	$('body').on('click', '.images-returned', function(event) {
		var state = $(this).attr('data-state');
		var imgStill = $(this).attr('data-still');
		var imgAnimate = $(this).attr('data-animate');
		if (state === 'still') {
			$(this).attr('src', imgAnimate);
			$(this).attr('data-state', 'animate');
		}
		if (state !== 'still') {
			$(this).attr('src', imgStill);
			$(this).attr('data-state', 'still');
		}
	});	
});