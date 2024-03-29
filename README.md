# What is VERN?

VERN is a social media app on Android/iOS for music sharing and discussion on a local, campus-wide scale. It also doubly serves as a platform for local artists to advertise 
their work to the college community. Our app is implemented using the standard MERN stack: MongoDB for the database, Node.js + Express for backend and React Native for the frontend.
The Spotify API is also extensively used throughout our app where necessary to provide generated playlists and statistics for the app.

# List of Features

## VERN account registration and integration with Spotify account
Our users can sign up as normal users or local artists with the ability to advertise their work and upcoming performances through our app.
Both registration and login are handled with JWT authentication using Express endpoints and with user info and hashed passwords stored in a
MongoDB database. Users can also link their Spotify accounts to their Vern accounts to provide extra functionality implemented in the app.

<img src="screenshots/login.png" width="250"> <img src="screenshots/register.png" width="250">

## Generated playlists curated from our local user population
Playlists are automatically curated using statistics and information provided by the Spotify API from users of the app.

<img src="screenshots/home.png" width="250"> <img src="screenshots/playlist.png" width="250">

