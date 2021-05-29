const fs = require('fs');
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
    clientId: '', // App client ID
    clientSecret: '', //App client secret
    redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
});
spotifyApi.setRefreshToken('') // Set refresh token, use auth_check.js to get a refresh token
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
    //Put spotify playlist URI here
    spotifyApi.getPlaylist('0dQG4uaWBzeITKmHwSl5BL')
    .then(function(data) {
        songs = []
        //console.log(data.body.tracks.items[0].track.artists.name)
        let count = 0
        for (let entry of data.body.tracks.items) {
            artists = []
            artistIds = []
            for (let artist of entry.track.artists){
                artists.push(artist.name)
                artistIds.push(artist.id)
            }
            let song = {
                "id": entry.track.id,
                "name": entry.track.name,
                "duration": entry.track.duration,
                "artists": artists,
                "artistIds": artistIds
            }
            songs.push(song)
            //console.log("------------------------------------------------")
            //console.log("Track #" + count)
            //console.log(entry.track.name)
            //count += 1 
            //console.log("By:")
            //for (let artist of entry.track.artists){
            //    console.log(artist.name)
            //}
        }
        let len = data.body.tracks.length
        let playlist = {
            "name": data.body.name,
            "id": data.body.id,
            "songs": songs,
            "noSongs": len
        }
        let date = new Date();
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let dateNumber = ("0" + date.getDate()).slice(-2);
        let todaysDate = (month + "-" + date + "-" + year)
        let payload = JSON.stringify(playlist, null, 4)
        i = 0;
        fs.writeFileSync("data/playlists/playlistExample.json", payload)
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  })
