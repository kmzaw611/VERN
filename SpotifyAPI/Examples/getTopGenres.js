//const { ART } = require('react-native');
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi({
    clientId: '', // App client ID
    clientSecret: '', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('') // Set refresh token, use auth_check.js to get a refresh token
spotifyApi.setAccessToken('')

//console.log("after error happ")

//Refresh your access token
spotifyApi.refreshAccessToken()
.then(function(data) {
    return data.body['access_token']
})
//Set the new access token
.then(function(newResult) {
    spotifyApi.setAccessToken(newResult)
    console.log(spotifyApi.getAccessToken())
})
//Get top tracks promise
.then(function(data) {
  var dict = {};
    spotifyApi.getMyTopTracks()
    .then(
        function(data) {
            let count = 0
            for (let topTrack of data.body.items) {
                console.log("Track #" + count + "----------------------------------------------------")
                console.log("Track Name: " + topTrack.name + "\n" + "Spotify URI for Track: " + topTrack.id)
                //console.log(topTrack.artists[0].id)
                spotifyApi.getArtist(topTrack.artists[0].id)
                .then(
                  function(data) {
                    let primaryGenre = data.body.genres[0]
                    if (dict[primaryGenre] !== undefined) {
                      dict[primaryGenre] += 1
                    }
                    else {
                      dict[primaryGenre] = 1
                    }
                    console.log(dict)
                  }
                )
                count += 1
            }
          return dict
        },
    )
//    .then(
//      function(data) {
//        console.log("HI!")
//        console.log(data)
//      }
//    )
})
