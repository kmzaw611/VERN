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
const mongoose = require('mongoose');
const User = require('./models/user');
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
        console.log("Shit went down idk man");
    }
});

// Allows us to use pictures and other local files on server page
// Probably useless to us but why not
server.use(express.static('public'));


// This gets called the second the server is created
// So it pretty much just prints hello world to the html of webpage
server.get('/', function (req, res) {
    res.send('Hello World!');
});

/*
 * Places new user into database with input of json file
 * Prints sent json object to console if succeeded
 */
server.post('/', function (req, res) {
    res.json({ requestBody: req.body })
    const user = new User({
        username: req.body.username,
        genre: req.body.genre,
        color: req.body.color,
        bio: req.body.bio,
        token: req.body.token
    });

    user.save()
        .then((result) => {
            //res.send(result);
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
});


/*
 * Retrieve user from database with input of json file
 * Prints retrieved json object to console
 */
server.get('/get-user', function (req, res) {
    res.json({ requestBody: req.body })
    const user = new User({
        username: req.body.username,
        genre: req.body.genre,
        color: req.body.color,
        bio: req.body.bio
    });

    User.findOne(
        {
            username: user.username,
            genre: user.genre,
            color: user.color,
            bio: user.bio
        }
    ).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
});
