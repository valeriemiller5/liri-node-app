require("dotenv").config();

var fs = require("fs");
var request = require("request");
var chalk = require("chalk");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var search = process.argv.slice(3).join(" ");
var bandUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=0e11a75281d05bf867da26007a4d3970";
var movieUrl = "https://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

if(command === "movie-this") {
    console.log("Searching for " + chalk.cyan.bold(search));
    movieThis();
} else if (command === "concert-this") {
    console.log("Searching for " + chalk.magenta.bold(search));
    concertThis();
} else if (command === "spotify-this-song") {
    console.log("Searching for " + chalk.yellow.bold(search));
    spotifyThis();
} else if (command === "do-what-it-says") {
    doThis();
} else {
    console.log (
        chalk.red.bold("Please type a command:"), 
        chalk.cyan.bold("\n   * movie-this"), 
        chalk.magenta.bold("\n   * concert-this"),
        chalk.yellow.bold("\n   * spotify-this-song"), 
        chalk.green.bold("\n   * do-what-it-says")
    );
};

//spotify-this-song (Spotify API) should pull this information:
function spotifyThis(song) {
    // if a song title isn't selected, default The Sign by Ace of Base
	spotify.search({ type: "track", query: search }, function(error, data) {
        if(error) {
            console.log(error);
        }
	    else {
            console.log(
                chalk.yellow.bold("-------------Spotify-This-Song---------------"),
                chalk.yellow.bold("\nArtist(s):    ") + data.tracks.items[0].artists[0].name,
                chalk.yellow.bold("\nSong Title:    ") + data.tracks.items[0].name, 
                chalk.yellow.bold("\nPreview Link: ") + data.tracks.items[0].preview_url, 
                chalk.yellow.bold("\nAlbum:        ") + data.tracks.items[0].album.name, 
                chalk.yellow.bold("\n---------------------------------------------")
            );
	    };	
	});
};

//movie-this (OMDb API) should pull this information:
function movieThis(movie) {
    // if a movie title isn't entered, default movie info for Mr. Nobody
    request(movieUrl, function(error, response, body){
        if(error) {
            console.log(error);
        }
        else if(!error && response.statusCode === 200) {
            console.log(
            chalk.cyan.bold("---------------Movie-This------------------"), 
            chalk.cyan.bold("\nMovie Title: ") + JSON.parse(body).Title, 
            chalk.cyan.bold("\nYear of release: ") + JSON.parse(body).Year, chalk.cyan.bold("\nIMDB Rating: ") + JSON.parse(body).Ratings[0].Value, chalk.cyan.bold("\nRotten Tomatoes Score: ") + JSON.parse(body).Ratings[1].Value, 
            chalk.cyan.bold("\nThis film was released in the following Countries: ") + JSON.parse(body).Country, 
            chalk.cyan.bold("\nThis film is available in the following Languages: ") + JSON.parse(body).Language, 
            chalk.cyan.bold("\nMovie Summary: ") + JSON.parse(body).Plot, 
            chalk.cyan.bold("\nStarring: ") + JSON.parse(body).Actors, 
            chalk.cyan.bold("\n--------------------------------------------")
            );
        };
    });
};

//concert-this (Bandsintown API) should pull this information:
function concertThis() {
    request(bandUrl, function(error, response, events) {
        if(error) {
            console.log(error);
        }
        else {
            console.log(
                chalk.magenta.bold("---------------Concert-This------------------"), 
                chalk.magenta.bold("\nBand Name: ") + JSON.parse(events)[0].lineup[0],
                chalk.magenta.bold("\nConcert Venue: ") + JSON.parse(events)[0].venue.name,
                chalk.magenta.bold("\nLocation: ") + JSON.parse(events)[0].venue.city + ", " + JSON.parse(events)[0].venue.region + ", " + JSON.parse(events)[0].venue.country,
                chalk.magenta.bold("\nConcert Date: ") + JSON.parse(events)[0].datetime,
                chalk.magenta.bold("\n---------------------------------------------"),
            );  
        };
    });
    //Concert Date
};

//function doThis() {
//
//    fs.readFile("random.txt", "utf8", function(error, data) { 
//    
//	});
//}