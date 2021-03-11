var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('AQBnVQQHmgcEO_hQ17vySu3dD2ZqwJlxAbcirYTXGRIR8cvRGcXHrAxyW2p8j2fk9aCjlacgcXYm0IqImjHCzNHq-bfn2cbDBGNdcqNHuNCMa23DLqucGEkB2HUnYXzdA5k') // Set refresh token, use auth_check.js to get a refresh token
//console.log("before error happens 2");
//spotifyApi.setAccessToken('BQAaE7GIhcz8R5k5elJQz-nvKuwdlK04RMzr8sfgg9FMlNkyfd_oj2ey1v4xX-nGZtyZSu2CL9FAmwOSGg_ywXT9hGNNLkI2VKeR6I2IhQixAiM8Ud6i-Unf3FpN1g8mJtac3jKlWFoI1kmKdWff34I-vw\n')
spotifyApi.refreshAccessToken()
.then(function(data) {
    return data.body['access_token']
})
.then(function(newResult) {
    spotifyApi.setAccessToken(newResult)
    console.log(spotifyApi.getAccessToken())
})
.then(function(newestResult) {
    spotifyApi.getMyTopTracks().then(
        function(data) {
            console.log(data.body.items)
        }
    )
  })
spotifyApi.getMyTopArtists()
  .then(function(data) {
    let topArtists = data.body.items;
    console.log(topArtists);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
//console.log(spotifyApi.getAccessToken())