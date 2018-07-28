require('dotenv').config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var NewsAPI = require('newsapi');
// var twitter = require('twitter');
var request = require('request');
// var omdb = require('omdb');
var fs = require('fs');
var userChoice = process.argv[2];
var choice;
var spotify = new Spotify(keys.spotify);
var newsapi = new NewsAPI(keys.newsAPI.apikey);
var omdb = new NewsAPI(keys.omdb.apikey);


var userChoice = function (choice) {
    switch (choice) {
        case 'my-news':
            showHeadlines();
            break;
        case 'spotify-this-song':
            spotifyThisSong();
            break;
        case 'movie-this':
            getMovie(data);
            break;
        case 'do-what-it-says':
            doThis();
            break;

        default:
            break;
            console.log("Sorry, I can't help you with that one")
    }
}

function getMovie() {
    omdb.search('saw', function(err, movies) {
        if(err) {
            return console.error(err);
        }
     
        if(movies.length < 1) {
            return console.log('No movies were found!');
        }
     
        movies.forEach(function(movie) {
            console.log('%s (%d)', movie.title, movie.year);
        });
     
        // Saw (2004)
        // Saw II (2005)
        // Saw III (2006)
        // Saw IV (2007)
        // ...
    });
};

getMovie();



function showHeadlines() {
    newsapi.v2.topHeadlines({
        // q: 'trump',
        category: 'sports',
        country: 'us',
        pageSize: 1
    }).then(response => {
        console.log(response);
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
    });
}

function spotifyThisSong(songTitle) {
    spotify.search({
        type: 'track',
        query: songTitle,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
    });
}