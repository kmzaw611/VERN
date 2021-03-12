/*
 * method list for client requests
 * You might have to run "npm i axios"
 * for it to work correctly, but try it without first
 */
const axios = require('axios');
const url = "http://127.0.0.1:3000";

const rh = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    proxy: false
});

const methods = {
    //POST call to create user
    create_user: function (callback, data) {
        rh.post(url + "/create-user", data)
        .then(res => {
            return callback(res.data);
        })
        .catch(error => {
            return callback("Booty");
        });
    },
    //POST call to get a user with input of username
    get_user: function (callback, name) {
        rh.post(url + "/get-user", name)
        .then(res => {
            return callback(res.data);
        })
        .catch(error => {
            return callback("Shit!");
        });
    },
    //POST call to update user info
    edit_user: function (callback, data) {
        rh.post(url + "/edit-user", data)
            .then(res => {
                return callback(res.data);
            })
            .catch(error => {
                return callback("ouch");
            });
    }
};
module.exports = methods;
