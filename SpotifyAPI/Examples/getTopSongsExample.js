var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('AQAUMHQ_3Gpo7SP_FugQXzPxT3Fg7VHormae_geNuXpGyKvfTcdGFs_AJ1O2ctrxOSXhNRKmmsuHW2giAh656RpRdXsGVSBzUzodatyfPhAbHnl6nYDYlWwLxbpnnLM9lns') // Set refresh token, use auth_check.js to get a refresh token
//spotifyApi.setAccessToken('BQDWFIQ1gDKfVDY8FU0jvM4tl96E7G3RyFzllznxgoKCJrNwiUWXEsaNAufcwoVtlCuwDq2QJ7D1N2ug5z6GfIO0v0j_kn3dXX4jKrP4NpeYQ38Wl0jhfD1tIXVfSZIrijq2pg-E06z5634uHPG-6Rxs1A')
//Refresh your access token
spotifyApi.refreshAccessToken().then(
    function(data) {
        console.log('Access token refreshed')
        console.log(data.body['access_token'])
        spotifyApi.setAccessToken(data.body['access_token'])
    },
    function(err) {
        console.log("Error while trying to refresh access token", err);
    }
);
spotifyApi.getMyTopTracks().then(
    function(data) {
        let topTracks = data.body.items;
        console.log("The top tracks for this user are: ", topTracks);
    },
    function(err) {
        console.log("Error while trying to get user's top tracks", err)
    });
