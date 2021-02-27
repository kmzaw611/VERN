var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express')

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
  
// credentials are optional
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

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        console.log('access_token: ', access_token)
        console.log('refresh_token: ', refresh_token)

        res.send("Success!")

      });
    });
app.listen(8888, () =>
    console.log(
        'Server up'
    )
);
