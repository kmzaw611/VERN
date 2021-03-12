//const { ART } = require('react-native');
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU') // Set refresh token, use auth_check.js to get a refresh token
spotifyApi.setAccessToken('BQAaE7GIhcz8R5k5elJQz-nvKuwdlK04RMzr8sfgg9FMlNkyfd_oj2ey1v4xX-nGZtyZSu2CL9FAmwOSGg_ywXT9hGNNLkI2VKeR6I2IhQixAiM8Ud6i-Unf3FpN1g8mJtac3jKlWFoI1kmKdWff34I-vw')

//console.log("after error happ")

//Refresh your access token
spotifyApi.refreshAccessToken()
    .then(function (data) {
        return data.body['access_token']
    })
    //Set the new access token
    .then(function (newResult) {
        spotifyApi.setAccessToken(newResult)
        console.log(spotifyApi.getAccessToken())
    })
    //Get top tracks promise
    .then(function (data) {
        spotifyApi.getMyTopTracks().then(
            function (data) {
                let topTracks = data.body.items;
                var genSeed = [];
                //console.log(genSeed.);
                var songs = []; //Array holding the track names and their ids.
                var i;
                //var songArtistName = da;
                let genreDict = {};
                //console.log(topTracks)
                //curl - X "GET" "https://api.spotify.com/v1/artists/137W8MRPWKqSmrBGDBFSop" - H "Accept: application/json" - H "Content-Type: application/json" - H "Authorization: Bearer "
                //fetch("https://api.spotify.com/v1/artists/137W8MRPWKqSmrBGDBFSop")
                //   .then(res => {console.log(res)})
                for (i = 0; i < topTracks.length; i++) {
                    songs.push(topTracks[i].name + "    " + topTracks[i].id + "  By: ");
                    //console.log(spotifyApi.getAvailableGenreSeeds())
                    for (var j = 0; j < topTracks[i].artists.length; j++) {
                        songs.push(topTracks[i].artists[j].name);
                        songs.push(topTracks[i].artists[j].id);
                        //topTracks.artists.forEach(artist => {
                        //    genreDict['genre'] = (genreDict['genre'] )
                        //})

                    }
                    //console.log(topTracks[i].album.artists[i].);
                    songs.push("");

                }
                i = 0;
                for (i = 0; i < songs.length; i++) {
                    console.log(songs[i]);

                }

                // return fetch("https://api.spotify.com/v1/artists/?ids=" + topTracks[1].id)

            }
        )
    })
    .then(function (data) {
        spotifyApi.getAvailableGenreSeeds().then(
            function (data) {
                let genreSeeds = data.body;
                console.log(genreSeeds);
            }, function (err) {
                console.log("something went poor", err);
            });
    })


//curl -X "GET" "https://api.spotify.com/v1/artists/137W8MRPWKqSmrBGDBFSop" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQDd5LtpypMznRjIyHbpDPttVs7UwXl4mmFfusMfuLWvyv2IakN-M8uHMd-FmLJ4CGKHUc18vD0kn6UlFL3rmsV-DG4uwEgTMb3k7USP9lNfijbDQ6ZxFDTm_nnny8mDzszUpTyIOgGml1a2nh25g1f3jPTJEiI_J7WxEuQJkRf56Kicu02ejDTF8FIfDerJNmmzgtvcaiVWr60PE__Peba_5SzSpkjRDL42SvIlJU9OyO6xZkg9zcpvWZRPXATuHcfO-mKjhamSTiAOiea0_WGwh3aprQkx"
//run this command with current Authorization bearer ****** to get song genres 



