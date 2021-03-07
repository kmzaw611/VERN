const { useCallback } = require('react');
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('AQAzdLg-OI2RDfvhWbnrwyMabkuxAsgQST00VLM9hchMvtwOhKQSg2608fIMOkX_40h-WsXa1i7AVMMw5idxJoyfwFNbOb1bIZHvbZmhedbuF-SAgNNOFdE4zQJOUgxLc24') // Set refresh token, use auth_check.js to get a refresh token
//spotifyApi.setAccessToken('BQCjA0q6VzVyMvpsIrpBFhoDq4zS_N1Tt9ganCu_J09XyJLuo5goZJ6X1JCFbWyQsK813C-vAW1ECQCgTrGe8rs_vdMOG8B64M0ECJkflI9vdfQUpWQgKEX7SFUe4OG4U2bTUDeetKRFIb7oQ4g6yWTe6nJU6ChBT-O6LK9N6cFiZNQMWd-TgAuWp6L1f6XowgSE_zjAwqL8-c_iooinH65FPjQdefWs-qVAstqoeEPWkTq2JnW_VD4lsYlEtc5V0we4TPK9K6vHdaKaaem0bAJfBHZwXPt4')
//Refresh your access token
spotifyApi.refreshAccessToken().then(
    async function(data) {  
        console.log('Access token refreshed')
        spotifyApi.setAccessToken(data.body['access_token'])
        console.log(spotifyApi.getAccessToken())
        //console.log(data.body['access_token'])
    },
    spotifyApi.getMyTopTracks().then(
        async function(data) {
            console.log(data.body.items)
        }
    ),
    function(err) {
        console.log("Error while trying to refresh access token", err);
    }
);
console.log(spotifyApi.getAccessToken())
/*spotifyApi.getMyTopTracks().then(
    function(data) {
        let topTracks = data.body.items;
        var songs = []; //Array holding the track names and their ids.
        var i;
        console.log(topTracks)
        for (i = 0; i < topTracks.length; i++) {
            songs.push(topTracks[i].name + " " + topTracks[i].id + " By: " + topTracks[i])
        }
        i = 0;
        for (i = 0; i < songs.length; i++) {
            console.log(songs[i])
        }
        //console.log("The top tracks for this user are: ", topTracks);
        
    },
    function(err) {
        console.log("Error while trying to get user's top tracks", err)
    });*/
