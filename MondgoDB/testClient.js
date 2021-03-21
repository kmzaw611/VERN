/*
 * method list for client requests
 * You might have to run "npm i axios"
 * for it to work correctly, but try it without first
 */
const axios = require('axios');
const fs = require('fs');
const url = "http://127.0.0.1:3000";
const userData = "../screens/username.json";

// If you are testing from an Android emulator use this url instead.
// Android Studio uses this url to redirect to the localhost if you are
// running from an emulator.
const emulator_url = "http://10.0.2.2:3000";

const rh = axios.create({
    // baseURL: url,
    baseURL: emulator_url,
    proxy: false
});

const methods = {
    //POST call to create user
    create_user: function (callback, data) {
        rh.post(url + "/create-user", data)
            .then(res => {
                console.log(res.data);
                var userD = JSON.stringify(res.data);
                fs.writeFile(userData, userD, function (err) {
                    if (err) {
                        return callback(err);
                    }
                });
                return callback(res.data);
            })
            .catch(error => {
                return callback("testClient.js : create user failed");
            });
    },
    // GET call to log in a user
    login_user: function (callback, data) {
        rh.post(emulator_url + "/login-user", data)
        .then(res => {
          return callback(res.data);
        })
        .catch(error => {
            console.log(error);
            return callback("testClient.js : login user failed");
        });
    },
    //POST call to get a user with input of username
    get_user: function (callback, name) {
        rh.post(url + "/get-user", name)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("post failed");
            });
    },
    //POST call to update user info
    edit_user: function (callback, data) {
        rh.post(url + "/edit-user", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("post failed");
            });
    },
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
    }
};
module.exports = methods;
