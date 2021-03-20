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
const UserSession = require('./models/user_session')
const Song = require('./models/song');
const Playlist = require('./models/playlist');
const cluster = require('./clusterConnector');

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

/*
 * Places new user into database with input of json file
 * Prints sent json object to console if succeeded
 * *EDIT* checks if username already exists within database
 */
server.post('/create-user', function (req, res) {
    //res.json({ requestBody: req.body });

    User.findOne({ email: req.body.email })
        .then(result => {
            if (!result) {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    genre: req.body.genre,
                    color: req.body.color,
                    bio: req.body.bio,
                    token: req.body.token,
                    songID: req.body.songID,
                    isLocalArtist: req.body.isLocalArtist,
                    isLocalBusiness: req.body.isLocalBusiness,
                });
                user.password = user.generateHash(req.body.password)

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
                res.send("Email Taken");
                res.end();
                console.log("Invalid attempt");
            }
        })
        .catch(err => { console.log(err)});
});

/*
 *
 * Reference: https://keithweaverca.medium.com/building-a-log-in-system-for-a-mern-stack-39411e9513bd
 *
 * POST request for when a user logs in. Handles the following things:
 * (1) Make sure email and password fields from the front-end are not empty.
 * (2) Validate email and password. Check the Mongoose model to find a valid user with the given email.
 * (3) There should be only be ONE valid user, otherwise something is very fucked from registration.
 * (4) Check if the bcrypt-hashed passwords match.
 * (5) If they do, effectively 'log in' the user by creating a new session for him and adding that to the user_session Mongoose model.
 */
server.post('/login-user', function (req, res) {
  const { email, password } = req;
  console.log("Login Email: " + email);
  console.log("Login Password: " + password);

  if (!email) {
    return res.send("Blank Email");
  }
  if (!password) {
    return res.send("Blank Password");
  }
  email = email.toLowerCase().trim();

  User.find({
    email: email
  }, (err, users) => {
    if (err) {
      return res.send("Server Error");
    }
    if (users.length === 0) {
      return res.send("No User With Email")
    }
    if (users.length > 1) {
      // This should never happen. Registration should not allow this.
      // If it does, the bug is with the registration process.
      return res.send("Multiple Users With Email")
    }

    // We've made sure that a single valid user exists with that email
    const user = users[0];
    // Calls the Bcrypt function implemented for every user
    if (!user.validPassword(password)) {
      return res.send("Incorrect Password");
    }
    // Password is valid. Start creating a user session.
    const userSession = new UserSession();
    userSession.userId = user._id; // Use MongoDB object id as the unique token
    userSession.save((err, doc) => {
      if (err) {
        return res.send("Server Error");
      }

      return res.send({
        message: "Valid Sign In",
        token: doc._id
      });
    });

  });


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
