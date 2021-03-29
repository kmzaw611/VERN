//import 'react-native-app-auth';
const {authorize, refresh} = 'react-native-app-auth';
//const auth = require('react-native-app-auth');

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: '0e8700b7f71d486bbb7c3bd120e892f8',
      clientSecret: '9ffb3fe2081b414e8c520d19805cbf09',
      redirectUrl: 'http://localhost:8888/callback',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      alert(JSON.stringify(result));
      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
    } 
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    return result;
  }

}

const authHandler = new AuthenticationHandler();

export default authHandler;