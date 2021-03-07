//Example of authenticating a user locally and then storing the refreshToken in MongoDB
var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')
const mongoose = require('mongoose');
const User = require('../../MondgoDB/models/user');
const uri = "mongodb+srv://ec99:verndev123@cluster0.y4whb.mongodb.net/Vern?retryWrites=true&w=majority";
const server = express();
server.use(express.json());
//Run this file from console and then visit http://localhost:8888/login to authorize and receive an access and refresh token.

// Pick from 'user-read-currently-playing','user-read-private','playlist-modify-public','playlist-read-private','playlist-modify-private'
//,'user-library-modify', 'user-library-read','user-top-read','user-read-recently-played','user-follow-read','user-follow-modify'

// This file is copied from: https://github.com/thelinmichael/spotify-web-api-node/blob/master/examples/tutorial/00-get-access-token.js
const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
      console.log("Database connected! Listening on server now...");
      server.listen('3000');
  })
  .catch((err) => console.log(err));
  
// SpotifyWebApi object handles all requests and stores tokens.
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8',
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09',
    redirectUri: 'http://localhost:8888/callback'
  });
  
  const app = express();
  app.get('/login', (req, res) => {
      res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });

  app.get('/callback', (req,res) => {
      const error = req.query.error;
      const code = req.query.code;    
      const state = req.query.state;
      if (error) { 
          console.error('Callback Error', error);
          res.send('Callback Error: ${error}');
          return;
  }
  // Gets the refresh and access token then makes a post request to the MongoDB
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        //console.log('access_token: ', access_token)
        //console.log('refresh_token: ', refresh_token)
        console.log(spotifyApi.getRefreshToken())
        res.send("Success!")
        //Test for making a post request to MongoDB that includes storing the User's refreshToken.
        server.post('/', function (req, res) {
          res.json({ requestBody: req.body })
          const user = new User({
              username: "Carson",
              genre: "Test Genre",
              color: "Test Color",
              bio: "Test Bio",
              refreshToken: spotifyApi.getRefreshToken()
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
      });
    });
//console.log(spotifyApi.getRefreshToken())
app.listen(8888, () =>
    console.log('Local Server up, paste http://localhost:8888/login into a browser')
);
