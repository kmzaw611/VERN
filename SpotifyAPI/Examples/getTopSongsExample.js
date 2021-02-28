//const { ART } = require('react-native');
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
//console.log("before error happens 1");
spotifyApi.setRefreshToken('AQCR9BNnDBgq-KHpwU6ZT8xY4UTFCW9vDmThGtQY60lnKU-y1YUBWH5NkQKWSf0tJswZQ2qK2nYdQJuAS47fzeH-8U26Udt8VifqslBK98DpgTh6niew7hS1EEpxpDtl21o') // Set refresh token, use auth_check.js to get a refresh token
//console.log("before error happens 2");
spotifyApi.setAccessToken('BQAaE7GIhcz8R5k5elJQz-nvKuwdlK04RMzr8sfgg9FMlNkyfd_oj2ey1v4xX-nGZtyZSu2CL9FAmwOSGg_ywXT9hGNNLkI2VKeR6I2IhQixAiM8Ud6i-Unf3FpN1g8mJtac3jKlWFoI1kmKdWff34I-vw')

//console.log("after error happ")

//Refresh your access token
/*spotifyApi.refreshAccessToken().then(
    function(data) {
        console.log('Access token refreshed')
        console.log(data.body['access_token'])
        spotifyApi.setAccessToken(data.body['access_token'])
    },
    function(err) {
        console.log("Error while trying to refresh access token", err);
    }
);*/

spotifyApi.getMyTopTracks().then(
    function (data) {
        let artist_id = [];
        //let topTracks = data.body.items;
        /*Prints out
         *  [ { external_urls: [Object],
            href: 'https://api.spotify.com/v1/artists/41klVmDluQZmGGqoidNfbe',
            id: '41klVmDluQZmGGqoidNfbe',
            name: 'Blac Youngsta',
            type: 'artist',
            uri: 'spotify:artist:41klVmDluQZmGGqoidNfbe' },
         * 
         *from the topT[]
         **/
        let topT = [];
        for (let topTrack of data.body.items) {
            //const track = topTrack.artists
            //1topT.push(track);
            artist_id.push(topTrack.id);
            spotifyApi.getArtist(artist_id.pop()).then(function (data) {
                console.log("Album info: ", data.body);
            }, function (err) {
                console.error(err);
            });
            //console.log(artist_id)
            console.log("My top songs are: ", topTrack.name)
            //console.log(spotifyApi.getArtist(topTrack.id))
            //console.log(topTrack.data.body.)
        }
       // console.log("The top tracks for this user are: ", topTracks);
        //console.log(Object.keys(data.body.items));
    },
    function(err) {
        console.log("Error while trying to get user's top tracks", err)
    });
