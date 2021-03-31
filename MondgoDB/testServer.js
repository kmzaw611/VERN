/*
 * If you want to play around with this script, you may need to run:
 * npm install mongoose
 * npm install express
 *
 * I now use testClient to access these methods
 */

const express = require('express');
const User = require('./models/user');
const Song = require('./models/song');
const Playlist = require('./models/playlist');
const Group = require('./models/group');
const cluster = require('./clusterConnector');
var SpotifyWebApi = require('spotify-web-api-node')

// Variables
const server = express();
server.use(express.json());
const port = '3000';

/* This is the connection between the script and the db */
cluster.connect(function (result) {
    if (result == 200) {
        server.listen(port);
        console.log("Listening on port: " + port);
    }
    else {
        console.log("problem with server connection");
    }
});

/* Allows us to use resources local to server file */
server.use(express.static('public'));

/* default state, does nothing */
server.get('/', function (req, res) {
    res.send('Hello World!');
    res.end();
});

/* Create, Get, and Edit User functions */
server.post('/create-user', function (req, res) {
    //The first block here checks to make sure that the email has not
    //been registered with an account before
    User.findOne({ email: req.body.email })
        .then(result => {
            // If we are clear to create new user
            if (!result) {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    genre: req.body.genre,
                    color: req.body.color,
                    bio: req.body.bio,
                    token: req.body.token,
                    songID: req.body.songID,
                    spotifyTokenID: req.body.spotifyTokenID,
                    spotifyTokenSecret: req.body.spotifyTokenSecret,
                    isLocalArtist: req.body.isLocalArtist,
                    isLocalBusiness: req.body.isLocalBusiness
                });
                user.password = user.generateHash(req.body.password);
                //Save user object in the database and send object to client
                user.save()
                    .then((result2) => {
                        console.log(result2);
                        res.send(result2);
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                console.log("Valid");
            }
            // If a user with that email already exists
            else {
                res.send("Email Taken");
                res.end();
                console.log("Invalid attempt");
            }
        })
        .catch(err => { console.log(err) });
});
server.post('/get-user', function (req, res) {
    console.log(req.body._id);
    User.findOne({ _id: req.body._id }
    ).then((result) => {
        console.log(result);
        if (result == null)
            res.send("Server: No User Found");
        else
            res.send(result);
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});
server.post('/edit-user', function (req, res) {
    User.findOne({ _id: req.body._id })
        .then(result => {
            if (result != null) {
                const find = {
                    _id: req.body._id
                }

                var update = req.body;
                delete update["_id"];
                console.log(update);

                User.findOneAndUpdate(find, update, { new: true })
                    .then(result2 => {
                        console.log(result2);
                        res.send(result2);
                        res.end();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            else {
                //Not clear to replace
                console.log(result);
                res.send("Couldnt find them");
                res.end();
            }
        })
        .catch(error => {
            console.log("Shit");
            console.error(error);
        });
});

/* Login and Logout User */
server.post('/login-user', function (req, res) {
  const { email, password } = req.body;
  // console.log("Login Email: " + email);
  // console.log("Login Password: " + password);

  if (!email) {
    return res.send("Blank Email");
  }
  if (!password) {
    return res.send("Blank Password");
  }
  User.find({
    email: email
  }, (err, users) => {
    if (err) {
      return res.send("Server Error");
    }
    if (users.length === 0) {
        return res.send("No User With Email");
    }
    else if (users.length > 1) {
      // This should never happen. Registration should not allow this.
      // If it does, the bug is with the registration process.
        return res.send("Multiple Users With Email");
    }
    else {
      // We've made sure that a single valid user exists with that email
      const user = users[0];
      // Calls the Bcrypt function implemented for every user
      if (!user.validPassword(password)) {
        return res.send("Incorrect Password");
      }
      else {
        // If we are here, the sign in is valid
        return res.send({
          message: 'Valid Sign In',
          userID: user._id
        });
      }
    }
  });
});
server.get('/logout-user', function (req, res) {
  // To be implemented
});

/* Spotify Calls (Get favorite song, get top songs) */
server.post('/get_favorite_song', function (req, res) {
    //To be implemented
    if (req.body.favoriteSong == null) {
        res.send("No favorite song set, please call the /edit_user endpoint first.")
    }
    else {
        res.send(req.body.favoriteSong)
    }
});
server.post('/top_songs_playlist', function (req, res) {
    console.log("test from top_songs_playlist in testServer.js")
    console.log(req.body.refreshToken)
    var spotifyApi = new SpotifyWebApi({
        clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
        clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
        redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
    })

    spotifyApi.setRefreshToken(req.body.refreshToken)
    spotifyApi.refreshAccessToken()
        .then(function (data) {
            return data.body['access_token']
        })
        //Set the new access token
        .then(function (newResult) {
            spotifyApi.setAccessToken(newResult)
            //console.log(spotifyApi.getAccessToken())
        })
        //Get top tracks promise
        .then(function (data) {
            //Getting the userID doesn't work right now, something with synchronous things
            userId = User.id
            spotifyApi.getMe().then(
                async function (data) {
                    userId = data.body.id
                }
            )
            spotifyApi.getMyTopTracks()                 //************************** change structs so we don't pass in any arrays ******unless react can handle those for display*/
                     //*******added async below*/
                .then(async function (data) {             
                    userId = ""
                    let topTracks = data.body.items;
                    var genSeed = [];
                    var i;
                    let genreDict = {};
                    var currentArtists = [];
                    var duration_ms;
                    currentIds = [];
                    songs = [];
                    for (i = 0; i < topTracks.length; i++) {
                        //A list of ALL artists featured on the current song
                        currentArtists[]
                        //A list of ALL artist IDs featured on the current song
                        currentIds = []
                        for (var j = 0; j < topTracks[i].artists.length; j++) {
                            currentArtists.push(topTracks[i].artists[j].name);
                           // console.log(currentArtists);
                            //currentIds.push(topTracks[i].artists[j].id);
                        }
                        //console.log(currentArtists[0]);
                        let song = {
                            "id": topTracks[i].id,
                            "name": topTracks[i].name,
                            "duration": topTracks[i].duration,
                            "artists": currentArtists.toString(),
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
                    //******************** something with the song.js & playlist.js schema's being intereperted in PlaylistScreen.js w/react
                    //differences with the one returned from testServer : user: '', songs: [ and ] w/date at bottom
                    let topSongs = {
                        //user: userId,
                        id: songs.id,
                        songs: songs,
                        
                        //date: todaysDate
                    }
                    payload = (JSON.stringify(topSongs, null, 4))       //modify for proper struct
                    i = 0;
                    const app = express();
                    //console.log(payload)
                    res.send(payload)
                    res.end()
                    //app.post("/top_songs_playlist", (req, res) => {
                    //    res.send(payload)
                    //})
                    //app.listen(3000);
                    console.log("Sent HTTP request to /top_songs_playlist on port 3000")
                })
        })
});

/* Make, Get song */
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
server.post('/get-song', function (req, res) {
    Song.findOne({ songID: req.body.songID }
    ).then((result) => {
        if (result == null)
            res.send("Server: No Song Found");
        else
            res.send(result);
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});

/* Create, Get, and Edit Group */
server.post('/create-group', function (req, res) {
    //The first block here checks to make sure that the email has not
    //been registered with an account before
    Group.findOne({ title: req.body.title })
        .then(result => {
            // If we are clear to create new user
            if (!result) {
                const group = new Group({
                    creatorID: req.body.creatorID,
                    title: req.body.title,
                    color: req.body.color,
                    bio: req.body.bio,
                    private: req.body.private,
                    password: req.body.password,
                    users: req.body.users,
                    numUsers: req.body.numUsers
                });
                if (!(group.password === ""))
                    group.password = group.generateHash(req.body.password);
                //Save user object in the database and send object to client
                group.save()
                    .then((result2) => {
                        res.send(result2);
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                console.log("Success");
            }
            // If a user with that email already exists
            else {
                res.send("Title Taken");
                res.end();
                console.log("Invalid attempt");
            }
        })
        .catch(err => {
            console.log(err);
            res.send(null);
            res.end();
        });
});
server.post('/get-group', function (req, res) {
    console.log(req.body.title);
    Group.findOne({ title: req.body.title }
    ).then((result) => {
        console.log(result);
        if (result == null)
            res.send("Server: No Group Found");
        else {
            res.send(result);
            console.log("Successful group grab");
        }
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});
server.post('/edit-group', function (req, res) {
    Group.findOne({ _id: req.body._id })
        .then(result => {
            //console.log(result);
            if (result != null) {
                if (result.creatorID == req.body.userID) {
                    const find = {
                        _id: req.body._id
                    }

                    var update = req.body;
                    delete update["_id"];
                    console.log(update);

                    Group.findOneAndUpdate(find, update, { new: true })
                        .then(result2 => {
                            console.log(result2);
                            res.send(result2);
                            res.end();
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    console.log("No permission");
                    res.send("You do not have permission to edit this group");
                    res.end();
                }
            }
            else {
                //Not clear to replace
                console.log(result);
                res.send("Couldnt find group");
                res.end();
            }
        })
        .catch(error => {
            console.log("Group edit error");
            console.error(error);
        });
});
server.post('/group-add-user', function (req, res) {
    Group.findOne({ _id: req.body._id })
        .then(result => {
            if (result != null) {
                //Check if they have access
                if (result.private == false) {
                    //Check if user is already in the list or if group is full
                    var check = 0;
                    var users = result.users;
                    for (var i = 0; i < users.length; i++) {
                        if (users[i] === (req.body.userID))
                            check = 1;
                    }
                    if (check == 0 && result.numUsers < 25) {
                        //Add the user
                        const find = {
                            _id: req.body._id
                        }
                        var update = {};
                        users.push(req.body.userID);
                        update["users"] = users;
                        update["numUsers"] = result.numUsers + 1;

                        Group.findOneAndUpdate(find, update, { new: true })
                            .then(result2 => {
                                //SUCCESS CASE
                                console.log(result2);
                                res.send(result2);
                                res.end();
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                    else {
                        console.log("User already in group");
                        res.send("You are already in this group");
                        res.end();
                    }
                }
                else {
                    console.log("Not allowed in");
                    res.send("You cannot join this group");
                    res.end();
                }
            }
            else {
                //Not clear to replace
                console.log(result);
                res.send(result);
                res.end();
            }
        })
        .catch(error => {
            console.log("add user error");
            console.error(error);
        });
});
server.post('/group-remove-user', function (req, res) {
    Group.findOne({ _id: req.body._id })
        .then(result => {
            if (result != null) {
                //Find user
                var check = -1;
                var users = result.users;
                for (var i = 0; i < users.length; i++) {
                    if (users[i] === (req.body.userID))
                        check = i;
                }
                if (check >= 0) {

                    const find = {
                        _id: req.body._id
                    }
                    
                    var update = {};
                    users.splice(check, 1);
                    console.log(check);
                    console.log(users);
                    update["users"] = users;
                    update["numUsers"] = result.numUsers - 1;

                    Group.findOneAndUpdate(find, update, { new: true })
                        .then(result2 => {
                            console.log(result2);
                            res.send(result2);
                            res.end();
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    console.log("User is not in this group");
                    res.send("User is not in this group");
                    res.end();
                }
            }
            else {
                //Not clear to replace
                console.log(result);
                res.send(result);
                res.end();
            }
        })
        .catch(error => {
            console.log("Group remove user error");
            console.error(error);
        });
});
server.post('/get-group-users', function (req, res) {
    console.log(req.body.title);
    Group.findOne({ title: req.body.title }
    ).then((result) => {
        console.log(result);
        if (result == null)
            res.send(result);
        else {
            res.send(result.users);
            console.log("Successful group users grab");
        }
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});



