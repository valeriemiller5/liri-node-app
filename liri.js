require("dotenv").config();

var fs = require("fs");
var request = require("request");
var moment = require("moment");
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
function spotifyThis() {
    // if a song title isn't selected, default The Sign by Ace of Base
    if(!search) {
		search = "The Sign Ace of Base";
	};

	spotify.search({ type: "track", query: search }, function(error, data) {
        if(error) {
            console.log(chalk.yellow.bold("Please check spelling or make another selection."));
            console.log(error);
            return
        } 
        else if(!error) {
            var song = 
                chalk.yellow.bold("-------------Spotify-This-Song---------------") +
                chalk.yellow.bold("\nArtist(s):    ") + data.tracks.items[0].artists[0].name +
                chalk.yellow.bold("\nSong Title:    ") + data.tracks.items[0].name + 
                chalk.yellow.bold("\nPreview Link: ") + data.tracks.items[0].preview_url + 
                chalk.yellow.bold("\nAlbum:        ") + data.tracks.items[0].album.name + 
                chalk.yellow.bold("\n---------------------------------------------")
            fs.appendFile("log.txt", song, function (err) {
                if (err) throw err;
                console.log(song);
                console.log(chalk.blueBright("This has been logged!"));
            });
	    };
	});
};

//movie-this (OMDb API) should pull this information:
function movieThis() {
    request(movieUrl, function(error, response, body){
        if (search === "") {
            // if a movie title isn't entered, default movie info for Mr. Nobody
            // got error message when requesting movie info from OMDb for Mr. Nobody
            var movieDefault = 
                chalk.cyan.bold("---------------Movie-This------------------") + 
                chalk.cyan.bold("\nMovie Title: ") + "Mr. Nobody" + 
                chalk.cyan.bold("\nYear of release: ") + "2009" + 
                chalk.cyan.bold("\nIMDB Rating: ") + "7.9/10" + 
                chalk.cyan.bold("\nRotten Tomatoes Score: ") + "66%" + 
                chalk.cyan.bold("\nThis film was released in the following Countries: ") + "Belgium, Germany, Canada, France, USA, UK" + 
                chalk.cyan.bold("\nThis film is available in the following Languages: ") + "English, Mohawk" + 
                chalk.cyan.bold("\nMovie Summary: ") + "A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible." + 
                chalk.cyan.bold("\nStarring: ") + "Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham" + 
                chalk.cyan.bold("\n--------------------------------------------")
        
            fs.appendFile("log.txt", movieDefault, function (err) {
                if (err) throw err;
                console.log(movieDefault);
                console.log(chalk.blueBright("This has been logged!"));
              });
        }
        else if(error) {
            console.log(chalk.cyan.bold("Please check spelling or make another selection."));
            console.log(error);
            return
        }
        else if(!error && response.statusCode === 200) {
            var movie = 
                chalk.cyan.bold("---------------Movie-This------------------") + 
                chalk.cyan.bold("\nMovie Title: ") + JSON.parse(body).Title + 
                chalk.cyan.bold("\nYear of release: ") + JSON.parse(body).Year + 
                chalk.cyan.bold("\nIMDB Rating: ") + JSON.parse(body).Ratings[0].Value + 
                chalk.cyan.bold("\nRotten Tomatoes Score: ") + JSON.parse(body).Ratings[1].Value + 
                chalk.cyan.bold("\nThis film was released in the following Countries: ") + JSON.parse(body).Country + 
                chalk.cyan.bold("\nThis film is available in the following Languages: ") + JSON.parse(body).Language + 
                chalk.cyan.bold("\nMovie Summary: ") + JSON.parse(body).Plot + 
                chalk.cyan.bold("\nStarring: ") + JSON.parse(body).Actors + 
                chalk.cyan.bold("\n--------------------------------------------")

            fs.appendFile("log.txt", movie, function (err) {
                if (err) throw err;
                console.log(movie);
                console.log(chalk.blueBright("This has been logged!"));
            });
        };
    });
};

//concert-this (Bandsintown API) should pull this information:
function concertThis() {
    request(bandUrl, function(error, response, events) {
        if(error) {
            console.log(chalk.magenta.bold("Please check spelling or make another selection."));
            console.log(error);
            return
        }
        else if(!error && response.statusCode === 200) {
            var concertDate = JSON.parse(events)[0].datetime;
            var dateFormat = "";
            var convertedDate = moment(concertDate, dateFormat);
            var event = 
                chalk.magenta.bold("---------------Concert-This------------------") + 
                chalk.magenta.bold("\nBand Name: ") + JSON.parse(events)[0].lineup[0] +
                chalk.magenta.bold("\nConcert Venue: ") + JSON.parse(events)[0].venue.name +
                chalk.magenta.bold("\nLocation: ") + JSON.parse(events)[0].venue.city + ", " + JSON.parse(events)[0].venue.country +
                chalk.magenta.bold("\nConcert Date: ") + moment(convertedDate).format("MM/DD/YYYY") +
                chalk.magenta.bold("\n---------------------------------------------")
    
            fs.appendFile("log.txt", event, "utf8", function (err) {
                if (err) throw err;
                console.log(event);
                console.log(chalk.blueBright("This has been logged!"));
            });  
        };
    });
};

function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
  		if (error) {
    		return console.log(error);
          }
          data = data.split(",");
          var newCommand;
          var newSearch;

          if(data.length == 2) {
              newCommand = data[0];
              newSearch = data[1];
              //console.log(newCommand);
              //console.log(newSearch);
          }

          if(newCommand === "spotify-this-song") {
              search = newSearch; 
              spotifyThis();
          }
 	});
};