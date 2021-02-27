var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '', // App client ID
    clientSecret: '', //App client secret
    redirectUri: '' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('') // Set refresh token
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
