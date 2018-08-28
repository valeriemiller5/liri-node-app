# liri-node-app

This project is a liri (Language Interpretation and Recognition Interface) node app that retrieves information for movie, song, and concert data using the Spotify, OMDb, and Bandsintown API's. Search results will be logged in the 'log.txt' file.

## Getting Started
To obtain a copy of this app, please visit https://github.com/valeriemiller5/liri-node-app. 

## Prerequisites
The package.json is included in the Github repository.  In order to run this app, the user will need to install the package.
'npm install'

### These are the API packages that are included:
### node-spotify-api
'npm install --save node-spotify-api'
### moment
'npm install moment --save'
### request
'npm install request'
### dotenv
'npm install dotenv'
### chalk
'npm install chalk'

## Running the tests
As the code is run, arguments for errors have been added for testing and informing user when input is not recognized.

## Issues Encountered
While working on this project, it was found that using http instead of https will cause a "socket hang up" error, causing the connection to terminate.  Also encountered was an issue with formatting the 'log.txt' file; using the Chalk module in Node.js causes the formatting of the text document to appear messy.

## Built With
* Node.js - language used to build the app
* Spotify API - used to pull information on songs using "spotify-this-song" command
* Bandsintown API - used to pull information on concert/events using "concert-this" command
* OMDb API - used to pull information on movies using "movie-this" command
* Moments.js - used to format dates for Bandsintown API when a date is available in MM/DD/YY format
* Chalk - a Node.js package used to prettify the data in the terminal with colors

## Authors
Valerie Flores - Initial work

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments
Thank you to UCI Coding Bootcamp classmates for your help and suggestions, and the many examples of other coders online.