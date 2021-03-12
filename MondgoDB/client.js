/*
 * This file contains examples for client requests to the server
 * At the moment, they concern the storage, retrieval, and editing of a user object
 */

//If server file is outside the MondgoDB directory, change it to './MondgoDB/testClient'
const methods = require('./testClient');

// Example of create user method call

const data = {
    username: "Man23",
    genre: "Test",
    color: "#FFFFFF",
    bio: "Test bio",
    token: "sumn",
    songID: "randomValue"
};

methods.create_user(function (result) {
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

// Example of edit user

const data2 = {
    current_username: "Man23",
    new_username: "Woman23",
    genre: "Test",
    color: "#FFFFFF",
    bio: "Test bio",
    token: "sumn",
    songID: "randomValue"
};

methods.edit_user(function (result) {
    console.log(result);
}, data2);

// End editUser

