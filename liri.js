require('dotenv').config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var NewsAPI = require('newsapi');
var request = require('request');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var newsapi = new NewsAPI(keys.newsAPI.apikey);


var userChoice = function (choice, data) {
    switch (choice) {
        case 'my-news':
            showHeadlines();
            break;
        case 'spotify-this-song':
            spotifyThisSong(data);
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

function getMovie(movieName) {
    request(`http://www.omdbapi.com/?t=${movieName}&r=json&apikey=trilogy`, function (error, response, body) {
        if (error) {
            console.log(error);
        }

        if (!movieName) movieName = "Mr. Nobody";

        var movieData = JSON.parse(body);
        console.log('Title: ' + movieData.Title);
        console.log('Year: ' + movieData.Year);
        console.log('IMDB Rating: ' + movieData.Ratings[0].Value);
        console.log('Rotten Tomatoes Rating: ' + movieData.Ratings[1].Value);
        console.log('Country: ' + movieData.Country);
        console.log('Language: ' + movieData.Language);
        console.log('Plot: ' + movieData.Plot);
        console.log('Actors: ' + movieData.Actors);
    })
};


function doThis() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        }
        var dataArr = data.split(',');
        userChoice(dataArr[0], dataArr[1])
    })
}

function showHeadlines() {
    newsapi.v2.topHeadlines({
        category: 'general',
        country: 'us',
        pageSize: 20
    }).then(response => {
        var count = 1;
        for (let i = 0; i < 20; i++) {
            console.log("--------------------" + "Article " + count + "--------------------")
            console.log("Author: " + response.articles[i].author);
            console.log("Publish Date: " + response.articles[i].publishedAt);
            console.log("Article Link: " + response.articles[i].url + "\n" + "\n");
            count++;
        }

    });
}

function spotifyThisSong(songTitle) {
    if (songTitle === "") {
        songTitle = "The Sign Ace of Base"
    }
    spotify.search({
        type: 'track',
        query: songTitle,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}

var run = function (argOne, argTwo) {
    userChoice(argOne, argTwo);
};

run(process.argv[2], process.argv[3]);