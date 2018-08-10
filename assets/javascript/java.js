$(document).ready(()=> {
    var games = ["Destiny", "GTA", "Monster Hunter", "Over Watch"]

    function makeButtons(){
// deletes the shows prior to adding new shows so there are no repeat buttons
$('#buttons-view').empty();
// loops through the shows array
for (var i = 0; i < games.length; i++){
    // dynamically makes buttons for every show in the array
    var a = $('<button>') 
    a.addClass('game'); // add a class
    a.attr('data-name', games[i]); // add a data-attribute
    a.text(games[i]); // make button text
    $('#buttons-view').append(a); // append the button to buttonsView div
    }
}
    $("#add-gif").on("click", ()=>{

        // grabs the user show input
        var game = $("#gif-input").val().trim();
        // that input is now added to the array
        games.push(game);
        // the makeButtons function is called, which makes buttons for all my shows plus the user show
        makeButtons();
        // this line is so users can hit "enter" instead of clicking the submit button
        return false; 
    })
    // function to display gifs
function displayGifs(){
    var game = $(this).attr("data-name")
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                game + "&api_key=XKo8op1ySUbCJChDx2u1pqIJ4EMOHQPC&limit=10";

		// creates ajax call
		$.ajax({
            url: queryURL, 
            method: "GET"})

            .then(function (response) {
			console.log(response);
			// save results as a variable
            var results = response.data;

			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
                var rating = results[i].rating;

                var gifDiv = $('<div class=gifs>');
                var p = $("<p>").text("Rating: " + rating)
				var gameGif = $('<img>');
					gameGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					gameGif.attr('data-still', results[i].images.fixed_height_still.url);
					gameGif.attr('data-state', 'still');
					gameGif.addClass('gif');
					gameGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(gameGif)
				gifDiv.append(p)

                $("#gif-view").prepend(gifDiv);
			}
			
		});
}
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".game", displayGifs);

// initially calls the makeButtons function
makeButtons();
//     for (var i = 0; i < games.length; i++) {
//         $("#gif-input").append("<button type='button' onclick='searchGif(\"" + games[i] + "\")' class='btn btn-primary' value=' " + gamse[i] + "'> " + games[i] + " </button>");
//     }
//     // function displayGifInfo() {
//         var game = $(this).attr("data-title")
//         var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
//             game + "&api_key=XKo8op1ySUbCJChDx2u1pqIJ4EMOHQPC";

//         $.ajax({
//                 url: queryUrl,
//                 method: "GET"
//             })

//             .then(function (response) {
//                 var results = response.data;
//                 console.log(results)


//                     var gifDiv = $("<div class= 'item'>")
//                     var gameImage = $("<img>");
//                     gameImage.attr("src", results[i].images.fixed_height.url)

//                     gifDiv.append(gameImage);


                
//             })
//     // }

//     function renderButtons() {
//         $("#buttons-view").empty();


//         var a = $("<button>");

//         a.addClass("game");

//         a.attr("data-title", games[i]);

//         a.text(games[i]);

//         $("#buttons-view").append(a);



//     }

//     $("#add-gif").on("click", function (event) {
//         event.preventDefault();

//         var game = $("#gif-input").val().trim();


//         games.push(game);


//         renderButtons();
//     });
//     $(document).on("click", ".game", displayGifInfo);


//     renderButtons();

});