var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')

//Run this file from console and then visit http://localhost:8888/login to authorize and receive an access and refresh token.

// Pick from 'user-read-currently-playing','user-read-private','playlist-modify-public','playlist-read-private','playlist-modify-private'
//,'user-library-modify', 'user-library-read','user-top-read','user-read-recently-played','user-follow-read','user-follow-modify'
const scopes = [
  'user-read-currently-playing','user-read-private','playlist-modify-public','playlist-read-private','playlist-modify-private'
  ,'user-library-modify', 'user-library-read','user-top-read','user-read-recently-played','user-follow-read','user-follow-modify'
  ];
  
// SpotifyWebApi object handles all requests and stores tokens.
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
  });
  
  const app = express();
  //Making the request to the localhost:8888/login endpoint
  app.get('/login', (req, res) => {
      res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });

  //Setting auth codes and states
  app.get('/callback', (req,res) => {
      //Parsing req
      const error = req.query.error;
      const code = req.query.code;    
      const state = req.query.state;
      if (error) { 
          //console.log("caught in auth_check.js");
          console.error('Callback Error', error);
          res.send('Callback Error: ${error}');
          return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
        
        //Set access and refresh token within the spotifyApi object
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        console.log('access_token: ', access_token);
        console.log('refresh_token: ', refresh_token);
        console.log('expires in: ', expires_in);
        res.send("Success!");

      });
    });
app.listen(8888, () =>
    console.log(
        'Local Server up, paste http://localhost:8888/login into a browser'
    )
);
