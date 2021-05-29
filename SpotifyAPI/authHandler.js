var SpotifyWebApi = require('spotify-web-api-node');

class AuthenticationHandler {
    constructor() {
        this.spotifyApi = new SpotifyWebApi({
            clientId: '', // App client ID
            clientSecret: '', //App client secret
            redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
        });
    }
    async onLogin() {
        const result = 
    }
}
