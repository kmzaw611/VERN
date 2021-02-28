var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
//console.log("before error happens 1");
spotifyApi.setRefreshToken('AQAcpyXOaVpD7UxLo1xYxiflyQVqJ5agLUdFXpTy7SU5X66F-vqvCl6WLNsmbAFd5MQR-cT5xf3AiUI55ZRHgMi4U7NjPsNp-4DGUguG5NuNtuFreqwXu8DnkARp9mWXuzY') // Set refresh token, use auth_check.js to get a refresh token
//console.log("before error happens 2");
spotifyApi.setAccessToken('BQBFwr_B5uTqT6UlhDL2EN3OECisL5fp0l_Y9ceqGGm5pcVpnZDhWd7Oj80Wozh3foz9_vvnRooiUJBLMH7ObYqxj4S8503xgocHbnaxZgQY1CTiaxFb-vSP7g3cLmF_6vPRIRtjABji-qA0l6nJd-3I7A')

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
            const track = topTrack.artists
            topT.push(track);
            console.log(topT)
        }
       // console.log("The top tracks for this user are: ", topTracks);
        //console.log(Object.keys(data.body.items));
    },
    function(err) {
        console.log("Error while trying to get user's top tracks", err)
    });
