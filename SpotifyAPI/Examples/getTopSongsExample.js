var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('AQAzdLg-OI2RDfvhWbnrwyMabkuxAsgQST00VLM9hchMvtwOhKQSg2608fIMOkX_40h-WsXa1i7AVMMw5idxJoyfwFNbOb1bIZHvbZmhedbuF-SAgNNOFdE4zQJOUgxLc24') // Set refresh token, use auth_check.js to get a refresh token
spotifyApi.setAccessToken('BQCoXwsLCUiYwrOAIvx02V8Sveu_nqF-huOYeGOjTcEH1Uu5WXU-FTOV298mmw_AtuHD0Yb7soFuqZ7H_wev1ObjcWyDtKabJKbleV5NhunemVswtZTXUNV0-ONovO_Bb8EDGaIdmIJpylHKdZ_4mpT8oBGX8ei37-sMqGjN-hLrSmnqMexvY5hxv3rq1BUDQAsr9GzyECk2XCv2zbWOBkfaX2Nc3Xly1TWSvxpH_yKq97abqyZmP6_D6Kk9hT_nnK0VDmbVAxa1DolmSY414GvswGU4mwsJ')
//Refresh your access token
/*spotifyApi.refreshAccessToken().then(
    function(data) {
        console.log('Access token refreshed')
        console.log(spotifyApi.getAccessToken())
        //console.log(data.body['access_token'])
        //spotifyApi.setAccessToken(data.body['access_token'])
    },
    function(err) {
        console.log("Error while trying to refresh access token", err);
    }
);*/
spotifyApi.getMyTopTracks().then(
    function(data) {
        let topTracks = data.body.items;
        var songs = [];
        var i;
        for (i = 0; i < topTracks.length; i++) {
            songs.push(topTracks[i].name + " " + topTracks[i].id)
        }
        i = 0;
        for (i = 0; i < songs.length; i++) {
            console.log(songs[i])
        }
        //console.log("The top tracks for this user are: ", topTracks);
        
    },
    function(err) {
        console.log("Error while trying to get user's top tracks", err)
    });
