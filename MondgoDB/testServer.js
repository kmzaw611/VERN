/*
 * If you want to play around with this script, you may need to run:
 * npm install mongoose
 * npm install express
 * 
 * I use postman to test the get/post calls
 * It's pretty easy to use, i honestly recommend 
 * downloading it for testing since we dont have a client atm
 */

const express = require('express');
const User = require('./models/user');
const Song = require('./models/song');
const Playlist = require('./models/playlist');
const cluster = require('./clusterConnector');
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
const server = express();
server.use(express.json());
const port = '3000';
/*
 * This is the connection between the script and the db
 * URI and connection function moved to separate script to
 * provide a bit of extra security
 */
cluster.connect(function (result) {
    if (result == 200) {
        server.listen(port);
        console.log("Listening on port: " + port);
    }
    else {
        console.log("problem with server connection");
    }
});

// Allows us to use pictures and other local files on server page
// Probably useless to us but why not
server.use(express.static('public'));


// This gets called the second the server is created
// So it pretty much just prints hello world to the html of webpage
server.get('/', function (req, res) {
    res.send('Hello World!');
    res.end();
});

server.get('/top_songs_playlist', function (req, res) {
    spotifyApi.setRefreshToken(User.token)
    .then(function (data) {
        return data.body['access_token']
    })
    //Set the new access token
    .then(function (newResult) {
        spotifyApi.setAccessToken(newResult)
        //console.log(spotifyApi.getAccessToken())
    })
    .then(function(data) {
        spotifyApi.getMe().then(
            function(data) {
                userId = data.body.id
            }
        )

    })
    //Get top tracks promise
    .then(function (data) {
        //Getting the userID doesn't work right now, something with synchronous things
        userId = User.id
        spotifyApi.getMe().then(
            async function(data) {
                userId = data.body.id
            }
        )
        spotifyApi.getMyTopTracks()
        .then(function (data) {
                userId = ""
                let topTracks = data.body.items;
                var genSeed = [];
                var i;
                let genreDict = {};
                currentArtists = [];
                currentIds = [];
                songs = [];
                for (i = 0; i < topTracks.length; i++) {
                    //A list of ALL artists featured on the current song
                    currentArtists = []
                    //A list of ALL artist IDs featured on the current song
                    currentIds = []
                    for (var j = 0; j < topTracks[i].artists.length; j++) {
                        currentArtists.push(topTracks[i].artists[j].name);
                        currentIds.push(topTracks[i].artists[j].id);
                    }
                    let song = {
                        "id": topTracks[i].id,
                        "name": topTracks[i].name,
                        "duration": topTracks[i].duration,
                        "artists": currentArtists,
                        "artistIds": currentIds
                    }
                    songs.push(song)
                }
                //Creating the JSON file to save
                userId = ""
                
                let date = new Date();
                let year = date.getFullYear();
                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                let dateNumber = ("0" + date.getDate()).slice(-2);
                let todaysDate = (month + "-" + date + "-" + year)
                let topSongs = {
                    user: userId,
                    songs: songs,
                    date: todaysDate
                }
                payload = (JSON.stringify(topSongs, null, 4))
                i = 0;
                const app = express();
                app.get("/top_songs_playlist", (req, res) => {
                    res.send(payload)
                })
                app.listen(3000);
                console.log("Sent HTTP request to /top_songs_playlist on port 3000")
            })
        })
})

/*
 * Places new user into database with input of json file
 * Prints sent json object to console if succeeded
 * *EDIT* checks if username already exists within database
 */
server.post('/create-user', function (req, res) {
    //res.json({ requestBody: req.body });
    User.findOne({ username: req.body.username })
        .then(result => {
            if (!result) {
                const user = new User({
                    username: req.body.username,
                    genre: req.body.genre,
                    color: req.body.color,
                    bio: req.body.bio,
                    token: req.body.token,
                    songID: req.body.songID
                });

                user.save()
                    .then((result2) => {
                        //result2.data = result2;
                        console.log(result2);
                        res.send(result2);
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                console.log("Valid");
            }
            else {
                res.send("Username Taken");
                console.log("Invalid attempt");
            }
        })
        .catch(err => { console.log(err)});
});

/*
 * Store a song
 */
server.post('/add-song', function (req, res) {
    //res.json({ requestBody: req.body });
    const song = new Song({
        songID: req.body.songID,
        title: req.body.title,
        artist: req.body.artist,
        length: req.body.length
    });

    song.save()
        .then((result2) => {
            //result2.data = result2;
            console.log(result2);
            res.send(result2);
            res.end();
        })
        .catch((err) => {
            console.log(err);
        });
    console.log("Song Stored");
});


/*
 * Retrieve user from database with input of json file
 * Prints retrieved json object to console
 */
server.post('/get-user', function (req, res) {
    User.findOne({username: req.body.username}
    ).then((result) => {
        console.log(result);
        res.send(result);
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});

server.post('/get-song', function (req, res) {
    Song.findOne({ songID: req.body.songID }
    ).then((result) => {
        console.log(result);
        res.send(result);
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});

server.post('/edit-user', function (req, res) {
    User.findOne({ username: req.body.new_username })
        .then(result => {
            if (!result) {
                //Clear to replace
                const find = {
                    username: req.body.current_username
                }

                const update = {
                    username: req.body.new_username,
                    genre: req.body.genre,
                    color: req.body.color,
                    bio: req.body.bio,
                    token: req.body.token,
                    songID: req.body.songID
                }

                User.findOneAndUpdate(find, update, { new: true })
                    .then(result2 => {
                        console.log(result2);
                        res.send(result2);
                        res.end();
                    })
                    .catch(error => {
                        console.error(error);
                    });
                console.log("Done!");
            }
            else {
                //Not clear to replace
                console.log("New username taken");
                res.send("new username taken");
                res.end();
            }
        })
        .catch(error => {
            console.error(error);
        });
});
