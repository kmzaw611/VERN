const fs = require('fs');
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
    clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU') // Set refresh token, use auth_check.js to get a refresh token
spotifyApi.setAccessToken('BQAaE7GIhcz8R5k5elJQz-nvKuwdlK04RMzr8sfgg9FMlNkyfd_oj2ey1v4xX-nGZtyZSu2CL9FAmwOSGg_ywXT9hGNNLkI2VKeR6I2IhQixAiM8Ud6i-Unf3FpN1g8mJtac3jKlWFoI1kmKdWff34I-vw')
var userId = ""

spotifyApi.refreshAccessToken()
    .then(function (data) {
        return data.body['access_token']
    })
    //Set the new access token
    .then(function (newResult) {
        spotifyApi.setAccessToken(newResult)
        //console.log(spotifyApi.getAccessToken())
    })
    .then(function(data) {
        spotifyApi.getMe().then(
            function(data) {
                userId = data.body.id
            }
        )

    })
    //Get top tracks promise
    .then(function(result) {
        let promise = spotifyApi.createPlaylist('Your top tracks', {'description': 'test', 'collaborative': false, 'public': true})
        return promise
    })
    .then(function (data) {
        let playlistURI = data.body.id
        console.log(data)
        //Getting the userID doesn't work right now, something with synchronous things
        //userId = ""
        //spotifyApi.getMe().then(
        //   async function(data) {
        //        userId = data.body.id
        //    }
        //)
        spotifyApi.getMyTopTracks({time_range: "long_term"})
        //spotifyApi.getMyTopTracks(options = [1,1,1])
        .then(function (data) {
                userId = ""
                let topTracks = data.body.items;
                var genSeed = [];
                var i;
                let genreDict = {};
                currentArtists = [];
                currentIds = [];
                songs = [];
                ids = [];
                for (i = 0; i < topTracks.length; i++) {
                    //A list of ALL artists featured on the current song
                    currentArtists = []
                    //A list of ALL artist IDs featured on the current song
                    currentIds = []
                    for (var j = 0; j < topTracks[i].artists.length; j++) {
                        currentArtists.push(topTracks[i].artists[j].name);
                        currentIds.push(topTracks[i].artists[j].id);
                    }
                    let song = {
                        "id": topTracks[i].id,
                        "name": topTracks[i].name,
                        "duration": topTracks[i].duration,
                        "artists": currentArtists,
                        "artistIds": currentIds
                    }
                    ids.push(topTracks[i].id)
                    songs.push(song)
                }
                //Creating the JSON file to save
                userId = ""
                
                let date = new Date();
                let year = date.getFullYear();
                let month = ("0" + (date.getMonth() + 1)).slice(-2);
                let dateNumber = ("0" + date.getDate()).slice(-2);
                let todaysDate = (month + "-" + date + "-" + year)
                let topSongs = {
                    user: userId,
                    songs: songs,
                    date: todaysDate
                }
                let payload = (JSON.stringify(topSongs, null, 4))
                //console.log(payload)
                i = 0;
                return [ids, playlistURI]
                //fs.writeFileSync("data/favoriteSongs/ " + userId + "TopSongs.json", payload)
    })
    .then(function(result) {
        //console.log(result[0])
        //console.log(result[1])
        let trackIds = result[0]
        for (i = 0; i < trackIds.length; i ++) {
             trackIds[i] = "spotify:track:" + trackIds[i];
        }
        spotifyApi.addTracksToPlaylist(result[1], trackIds)
    })
})
            
        
       
