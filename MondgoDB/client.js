/*
 * This file contains examples for client requests to the server
 * At the moment, they concern the storage, retrieval, and editing of a user object
 * I am using a cool prompt library for testing right now, you have to run: 
 * "npm install prompt"
 * to use it too.
 */

//If server file is outside the MondgoDB directory, need to change the path
const methods = require('./testClient');
const prompt = require('prompt');

/*
//Add new Users
const user = {
    username: "TestPerson3",
    email: "newmail3",
    password: "huh",
    genre: "",
    color: "",
    bio: "",
    following: [],
    followers: [],
    groups: [],
    spotifyTokenID: "sumn",
    spotifyTokenSecret: "sumn",
    token: "duh",
    songID: "duh",
    isLocalArtist: true,
    isLocalBusiness: false,
    refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU"
}
methods.create_user(function (result) {
    console.log(result);
}, user);

const user2 = {
    username: "TestPerson4",
    email: "newmail4",
    password: "huh",
    genre: "",
    color: "",
    bio: "",
    following: [],
    followers: [],
    groups: [],
    spotifyTokenID: "sumn",
    spotifyTokenSecret: "sumn",
    token: "duh",
    songID: "duh",
    isLocalArtist: true,
    isLocalBusiness: false,
    refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU"
}
methods.create_user(function (result) {
    console.log(result);
}, user2);
*/


const data = {
    _id: "606265574ded5926b0fbdeb2",
    userID: "6062b12f43a0ad02805f72ae"
}
methods.group_remove(function (result) {
    console.log(result);
}, data);


//Group Testing
/*
const data = {
    creatorID: "123456789",
    title: "4th Ever Group",
    color: "#FFFFFF",
    bio: "For testing",
    private: false,
    password: "",
    users: [
        "9634209323",
        "23749638472",
        "324878927349"
    ],
    numUsers: 3
};

methods.create_group(function (result) {
    console.log(result);
}, data);
*/


/*
const name = {
    title: "First Ever Group"
};

methods.get_group(name, function (result) {
    console.log(result);
});
*/

/* Requires group ID (_id) and currents user's _id (userID) */
/* followed by the fields you want to edit */
/*
prompt.start();
prompt.get(['userID', 'color', 'bio'], function (err, result) {
    const data2 = {};
    data2._id = "606265574ded5926b0fbdeb2"; // I aint typin that in every time
    data2.userID = result.userID;
    data2.color = result.color;
    data2.bio = result.bio;

    methods.edit_group(function (result) {
        console.log(result);
    }, data2);
});



data2 = {
    title: "First Ever Group"
}

methods.group_users(function (result) {
    console.log(result);
}, data2);

                      -----------------------------------------------------------------Start Comment
const user = require('./userInfo/allUsers.json');
const uname = require('./uname');


// Example of create user method call

var s = "Kyle";
uname.set_username(s);
uname.get_username(function (result) {
    console.log(result);
});

var name = {
    username: "Man7"
};
uname.get_username(function (result) {
    name.username = result;
});

methods.get_user(name, function (result) {
    console.log(result);
});

//console.log(userData);

const data = {
    username: "Duh",
    email: "new email23",
    password: "huh",
    genre: "duh",
    color: "duh",
    bio: "duh",
    token: "duh",
    songID: "duh",
    isLocalArtist: true,
    isLocalBusiness: false,
    refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU"
};

//methods.create_user(function (result) {
//    console.log(result);
//}, data);

methods.top_songs(function (result) {
    console.log(result);
}, data);

                 
// End create user


// Example of get user
const name = {
    username: "Man7"
};

methods.get_user(function (result) {
    console.log(result);
}, name);

// End getUser
                       --------------------------------------------------------------------- End Comment */
// Example of edit user
/*
prompt.start();
prompt.get(['name', 'nname', 'genres', 'color', 'bio', 'songID'], function (err, result) {
    //
    // Log the results.
    //

    const data2 = {};
    data2.current_username = result.name;
    data2.new_username = result.nname;
    data2.genre = result.genres;
    data2.color = result.color;
    data2.bio = result.bio;
    data2.songID = result.songID;

    methods.edit_user(function (result) {
        console.log(result);
    }, data2);
});
*/
// End editUser