/*
 * method list for client requests
 * need to install "npm i axios" first
 */
const axios = require('axios');

/* Use 0 for local testing (client.js), and 1 for Emulator testing */
const urlCode = 1;

var url = "";

if (urlCode === 0)
    url = "http://127.0.0.1:3000";
else
    url = "http://10.0.2.2:3000";
// If you are testing from an Android emulator use this url instead.
// Android Studio uses this url to redirect to the localhost if you are
// running from an emulator

const rh = axios.create({
    // baseURL: url
    baseURL: url,
    proxy: false
});

const methods = {
    
    //POST calls for create, get, and edit user
    create_user: function (callback, data) {
        rh.post(url + "/create-user", data)
            .then(res => {
                console.log(res.data);
                /*
                Commented out because it breaks the code.
                And I think we no longer need this after AsyncStorage implementation?
                var userD = JSON.stringify(res.data);
                fs.writeFile(userData, userD, function (err) {
                    if (err) {
                        return callback(err);
                    }
                });
                */
                return callback(res.data);
            })
            .catch(error => {
                return callback("testClient.js : create user failed");
            });
    },
    get_user: function (id, callback) {
        rh.post(url + "/get-user", id)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                console.log("butt " + error);
                return callback("post failed");
            });
    },
    edit_user: function (callback, data) {
        rh.post(url + "/edit-user", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("post failed");
            });
    },
    follow_user: function (callback, data) {
        rh.post(url + "/follow-user", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("follow post failed");
            });
    },
    unfollow_user: function (callback, data) {
        rh.post(url + "/unfollow-user", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("follow post failed");
            });
    },

    // GET call to log in a user
    login_user: function (callback, data) {
        rh.post(url + "/login-user", data)
        .then(res => {
          return callback(res.data);
        })
        .catch(error => {
            return callback("testClient.js : login user failed");
        });
    },

    //POST calls for create, get, and edit group
    create_group: function (callback, data) {
        rh.post(url + "/create-group", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("testClient.js : create group failed");
            });
    },
    get_group: function (callback, name) {
        rh.post(url + "/get-group", name)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("get group failed");
            });
    },
    get_groups: function (callback, name) {
        rh.post(url + "/get-groups", name)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("get groups failed");
            });
    },
    edit_group: function (callback, data) {
        rh.post(url + "/edit-group", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("edit group failed");
            });
    },
    group_add: function (callback, data) {
        rh.post(url + "/group-add-user", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("add user failed");
            });
    },
    group_remove: function (callback, data) {
        rh.post(url + "/group-remove-user", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("remove user failed");
            });
    },
    group_users: function (callback, data) {
        rh.post(url + "/get-group-users", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("get users failed");
            });
    },

    group_access: function (callback, data) {
        rh.post(url + "/group_access", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("testClient.js : group pass failed");
            });
    },

    // POST calls for Store/Get song
    store_song: function (callback, data) {
        rh.post(url + "/add-song", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("post failed");
            });
    },
    get_song: function (callback, id) {
        rh.post(url + "/get-song", id)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("post failed");
            });
    },

    //POST call for favorite songs
    top_songs: function (callback, data) {
        rh.post(url + "/top_songs_playlist", data)
            .then(res => {
                //console.log(res.data)
                return callback(res.data)
            })
            .catch(error => {
                return callback("Error in top songs");
            });

    },
    publish_top_songs: function (callback, data) {
        rh.post(url + "/publish_top_songs_playlist", data)
            .then(res => {
                return "Playlist" + data.name + " published successfully"
                
            })
            .catch(error => {
                return callback("Error in publish top songs");
            });


    },
    get_thread: function (callback, id) {
        rh.post(url + "/get-thread", id)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("testClient.js : get Thread failed");
            });
    },
    create_thread: function (callback, identifiers) {
        rh.post(url + "/create-thread", identifiers)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("create thread failed");
            });
    },
    make_post: function (callback, data) {
        rh.post(url + "/make-post", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("create post failed");
            });
    }
};
module.exports = methods;
