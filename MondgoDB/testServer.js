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
const Thread = require('./models/thread');
const Local = require('./models/localArtist');

const cluster = require('./clusterConnector');
var SpotifyWebApi = require('spotify-web-api-node')

// Variables
const server = express();
server.use(express.json());
const port = '3000';

const MAXPOSTS = 15;

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
                    following: req.body.following,
                    followers: req.body.followers,
                    groups: req.body.groups,
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
        else {
            res.send(result);
            console.log("Worked");
        }
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
            console.log("Server Error");
            console.error(error);
        });
});
server.post('/follow-user', function (req, res) {
    //Get user
    User.findOne({ _id: req.body.their_id })
        .then(result => {
            //Found other user
            if (result != null) {
                //Check if already following
                var check = 0;
                var follows = result.followers;
                for (var i = 0; i < follows.length; i++) {
                    if (follows[i] === (req.body.my_id))
                        check = 1;
                }
                if (check == 0) {
                    //If follow connection already exists
                    User.findOne({ _id: req.body.my_id })
                        .then(result2 => {
                            if (result != null) {
                                //Found me
                                var find = {
                                    _id: req.body.their_id
                                }
                                var update = {};
                                follows.push(req.body.my_id);
                                update["followers"] = follows;

                                User.findOneAndUpdate(find, update, { new: true })
                                    .then(result3 => {
                                        console.log(result3);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                        res.send("add Error (them)");
                                        res.end();
                                    });

                                find = {
                                    _id: req.body.my_id
                                }
                                delete update.followers;
                                follows = result2.following;
                                follows.push(req.body.their_id);
                                update["following"] = follows;

                                User.findOneAndUpdate(find, update, { new: true })
                                    .then(result3 => {
                                        console.log(result3);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                        res.send("add Error (me)");
                                        res.end();
                                    });
                                console.log("SUCCESS");
                                res.send("SUCCESS");
                                res.end();
                            }
                            else {
                                //Cound not find my profile
                                console.log(result);
                                res.send("Couldnt find this user (me)");
                                res.end();
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    console.log("Already following");
                    res.send("Already following");
                    res.end();
                }
            }
            else {
                // Could not find this user
                console.log(result);
                res.send("Couldnt find this user");
                res.end();
            }
        })
        .catch(error => {
            console.error(error);
        });
});
server.post('/unfollow-user', function (req, res) {
    //Get user
    User.findOne({ _id: req.body.their_id })
        .then(result => {
            //Found other user
            if (result != null) {
                //Check if already following
                var check = -1;
                var followers = result.followers;
                for (var i = 0; i < followers.length; i++) {
                    if (followers[i] === (req.body.my_id))
                        check = i;
                }
                if (check >= 0) {
                    //If follow connection already exists
                    User.findOne({ _id: req.body.my_id })
                        .then(result2 => {
                            var check2 = -1;
                            var following = result2.following;
                            for (var i = 0; i < following.length; i++) {
                                if (following[i] === (req.body.their_id))
                                    check2 = i;
                            }
                            if (result != null) {
                                //Found me
                                var find = {
                                    _id: req.body.their_id
                                }
                                var update = {};
                                followers.splice(check, 1);
                                update["followers"] = followers;

                                User.findOneAndUpdate(find, update, { new: true })
                                    .then(result3 => {
                                        console.log(result3);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                        res.send("add Error (them)");
                                        res.end();
                                    });

                                find = {
                                    _id: req.body.my_id
                                }
                                delete update.followers;
                                following = result2.following;
                                following.splice(check2, 1);
                                update["following"] = following;

                                User.findOneAndUpdate(find, update, { new: true })
                                    .then(result3 => {
                                        console.log(result3);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                        res.send("add Error (me)");
                                        res.end();
                                    });
                                console.log("SUCCESS");
                                res.send("SUCCESS");
                                res.end();
                            }
                            else {
                                //Cound not find my profile
                                console.log(result);
                                res.send("Couldnt find this user (me)");
                                res.end();
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                else {
                    console.log("Not Following");
                    res.send("Not Following");
                    res.end();
                }
            }
            else {
                // Could not find this user
                console.log(result);
                res.send("Couldnt find this user");
                res.end();
            }
        })
        .catch(error => {
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
                .then(function (data) {             
                    userId = ""
                    let topTracks = data.body.items;
                    var genSeed = [];
                    var i;
                    let genreDict = {};
                    var currentArtists = [];
                    //var duration_ms;
                    currentIds = [];
                    songs = [];
                    for (i = 0; i < topTracks.length; i++) {
                        //A list of ALL artists featured on the current song
                        currentArtists = []
                        //A list of ALL artist IDs featured on the current song
                        currentIds = []
                        for (var j = 0; j < topTracks[i].artists.length; j++) {
                            currentArtists.push(topTracks[i].artists[j].name);
                            //console.log(currentArtists);
                            //currentIds.push(topTracks[i].artists[j].id);
                        }
                        //console.log(currentArtists[0]);
                        let song = {
                            "songID": topTracks[i].id,
                            "title": topTracks[i].name,
                            "artist": currentArtists.join(),
                            "length": topTracks[i].popularity,
                            "snippet": topTracks[i].preview_url
                            //"artistIds": currentIds.join()
                        }
                        //console.log(song.snippet)
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
                        songs: songs
                        //date: todaysDate
                        
                        //date: todaysDate
                    }
                    payload = (JSON.stringify(songs, null,5))       //modify for proper struct
                    i = 0;
                    const app = express();
                    console.log(payload)
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
                    users: [],
                    numUsers: 0
                });
                if (!(group.password === ""))
                    group.password = group.generateHash(req.body.password);
                //Save user object in the database and send object to client
                group.save()
                    .then((result2) => {
                        console.log("Yup");
                        console.log(result2);
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
    console.log(req.body._id);
    Group.findOne({ _id: req.body._id }
    ).then((result) => {
        console.log(result);
        if (result == null)
            res.send(result);
        else {
            res.send(result);
            console.log("Successful group grab");
        }
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});
server.post('/get-groups', function (req, res) {
    console.log(req.body.title);
    Group.find({ title: req.body.title })
    .then((result) => {
        console.log(result);
        if (result == null)
            res.send(result);
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
//Need to add/remove group from user data upon addition/removal 
server.post('/group-add-user', function (req, res) {
    User.findOne({ _id: req.body.userID })
        .then(result1 => {
            Group.findOne({ _id: req.body._id })
                .then(result => {
                    if (result != null) {
                        //Check if they have access
                        if (result.private == false || result.creatorID === req.body.userID /* || result.pass === encrypted req.body.pass*/) {
                            //Check if user is already in the list or if group is full
                            var check = 0;
                            var users = result.users;
                            for (var i = 0; i < users.length; i++) {
                                if (users[i] === (req.body.userID))
                                    check = 1;
                            }
                            if (check == 0 && result.numUsers < 25) {
                                //Add the user
                                var find = {
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
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });

                                find = {
                                    _id: req.body.userID
                                }
                                delete update.users;
                                delete update.numUsers;
                                result1.groups.push(req.body._id);
                                update["groups"] = result1.groups;

                                User.findOneAndUpdate(find, update, { new: true })
                                    .then(result2 => {
                                        //SUCCESS CASE
                                        console.log(result2);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });
                                console.log("SUCCESS");
                                res.send("SUCCESS");
                                res.end();
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
        })
        .catch(error => {
            //Couldnt find user
            console.log("Couldnt find user");
            console.error(error);
        })
});
server.post('/group-remove-user', function (req, res) {
    User.findOne({ _id: req.body.userID })
        .then(result1 => {
            var check1 = -1;
            var groups = result1.groups;
            for (var i = 0; i < groups.length; i++) {
                if (groups[i] === (req.body._id))
                    check1 = i;
            }
            if (check1 >= 0) {
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

                                var find = {
                                    _id: req.body._id
                                }

                                var update = {};
                                users.splice(check, 1);
                                update["users"] = users;
                                update["numUsers"] = result.numUsers - 1;

                                Group.findOneAndUpdate(find, update, { new: true })
                                    .then(result2 => {
                                        console.log(result2);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });

                                find = {
                                    _id: req.body.userID
                                }

                                groups.splice(check1, 1);
                                delete update.users;
                                delete update.numUsers;
                                update["groups"] = groups;

                                User.findOneAndUpdate(find, update, { new: true })
                                    .then(result2 => {
                                        console.log(result2);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });
                                console.log("SUCCESS");
                                res.send("SUCCESS");
                                res.end();
                            }
                            else {
                                console.log("Group doesnt have user");
                                res.send("Group doesnt have user");
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
            }
            else {
                console.log("Not in this group");
                res.send("Not in group");
                res.end();
            }
        })
        .catch(error => {
            //Couldnt find user
            console.log("Couldnt find user");
            console.error(error);
        })
});
//All Good
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

server.post('/group_access', function (req, res) {
    const { _id, password } = req.body;
    // console.log("Login Email: " + email);
    // console.log("Login Password: " + password);
    if (!password) {
        return res.send("Blank Password");
    }
    Group.find({
        _id: _id
    }, (err, groups) => {
        if (err) {
            return res.send("Server Error");
        }
        else {
            console.log("no error");
            // We've made sure that a single valid user exists with that email
            const group = groups[0];
            // Calls the Bcrypt function implemented for every user
            if (!group.validPassword(password)) {
                console.log("Wrong");
                return res.send("Incorrect Password");
            }
            else {
                console.log("Correct!");
                // If we are here, the sign in is valid
                return res.send("SUCCESS");
            }
        }
    });
});

//thread functions

server.post('/get-thread', function (req, res) {
    console.log(req.body.threadID);
    Thread.findOne({ threadID: req.body.threadID }
    ).then((result) => {
        console.log(result);
        if (result == null)
            res.send(result);
        else {
            res.send(result);
            console.log("Successful thread grab");
        }
        res.end();
    }).catch((err) => {
        console.log(err);
    });
});
server.post('/create-thread', function (req, res) {
    Thread.findOne({ threadID: req.body.threadID })
        .then(result1 => {
            if (result1 == null) {
                const nThread = new Thread({
                    threadID: req.body.threadID,
                    threadTitle: req.body.threadTitle,
                    posts: []
                });
                nThread.save()
                    .then((result2) => {
                        console.log(result2);
                        res.send(result2);
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                console.log("Thread with given ID exists");
                res.send(result1);
                res.end();
            }
        })
        .catch(err => {
            console.log("Server error:");
            console.log(err);
        });
});
server.post('/make-post', function (req, res) {
    Thread.findOne({ threadID: req.body.threadID })
        .then(result => {
            if (result != null) {
                console.log(result);
                const nPost = {
                    username: req.body.username,
                    time: req.body.time,
                    title: req.body.title,
                    content: req.body.content
                };
                var len = result.posts.length;
                if (len == MAXPOSTS)
                    len -= 1;
                for (var i = len; i > 0; i--) {
                    result.posts[i] = result.posts[i - 1];
                    if (i == 1) {
                        result.posts[0] = nPost;
                        Thread.findOneAndUpdate({ threadID: req.body.threadID }, {posts: result.posts}, { new: true })
                            .then(result2 => {
                                res.send(result2);
                                res.end();
                                return;
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                }
                if (len == 0) {
                    result.posts[0] = nPost;
                    Thread.findOneAndUpdate({ threadID: req.body.threadID }, { posts: result.posts }, { new: true })
                        .then(result2 => {
                            res.send(result2);
                            res.end();
                            return;
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }
            else {
                res.send("Server Error: No thread found here");
                res.end();
            }
        })
        .catch(err => {
            console.log(err);
            console.log("Server Error: findOne fail");
            res.send(null);
            res.end();
        });
});

//local functions

server.post('/create-local', function (req, res) {
    Local.findOne({ creatorID: req.body.creatorID })
        .then(result1 => {
            if (result1 == null) {
                const nLocal = new Local({
                    creatorID: req.body.creatorID,
                    name: req.body.name,
                    genre: req.body.genre,
                    location: req.body.location,
                    biography: req.body.biography,
                    contactInfo: req.body.contactInfo,
                    updates: []
                });
                nLocal.save()
                    .then((result2) => {
                        console.log(result2);
                        res.send(result2);
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                console.log("Local with given creator exists");
                res.send(result1);
                res.end();
            }
        })
        .catch(err => {
            console.log("Server error:");
            console.log(err);
        });
});
server.post('/edit-local', function (req, res) {
    Local.findOne({ creatorID: req.body.creatorID })
        .then(result => {
            if (result != null) {
                const find = {
                    creatorID: req.body.creatorID
                }

                var update = req.body;
                delete update["creatorID"];
                console.log(update);

                Local.findOneAndUpdate(find, update, { new: true })
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
            console.log("Server Error");
            console.error(error);
        });
});




