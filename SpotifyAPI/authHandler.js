var SpotifyWebApi = require('spotify-web-api-node');

class AuthenticationHandler {
    constructor() {
        this.spotifyApi = new SpotifyWebApi({
            clientId: '0e8700b7f71d486bbb7c3bd120e892f8', // App client ID
            clientSecret: '9ffb3fe2081b414e8c520d19805cbf09', //App client secret
            redirectUri: 'http://localhost:8888/callback' //Where the user is to be taken after authentication
        });
    }
    async onLogin() {
        const result = 
    }
}