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

const uri = "mongodb+srv://ec99:verndev123@cluster0.y4whb.mongodb.net/Vern?retryWrites=true&w=majority";


const server = express();
server.use(express.json());

/*
 * This is the connection between the script and the db
 * Will likely move this and the uri to different file and call
 * as a function to protect login data
 */

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Database connected! Listening on server now...");
        server.listen('3000');
    })
    .catch((err) => console.log(err));


// Allows us to use pictures and other local files on server page
// Probably useless to us but why not
server.use(express.static('public'));


// This gets called the second the server is created
// So it pretty much just prints hello world to the html of webpage
server.get('/', function(req, res) {
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
        bio: req.body.bio
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
server.get('/see-ethan', function (req, res) {
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
