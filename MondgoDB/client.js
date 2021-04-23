/*
 * This file contains examples for client requests to the server
 * At the moment, they concern the storage, retrieval, and editing of a user object
 * I am using a cool prompt library for testing right now, you have to run: 
 * "npm install prompt"
 * to use it too.
 */

//If server file is outside the MondgoDB directory, need to change the path
const methods = require('./testClient');
//const prompt = require('prompt');

// data1 = {
//      refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU",
//      timeRange: "short"
//      //name: "test2"
//  }

// methods.top_songs(function (result) {
// console.log(result);
// }, data1);
data2 = {
    _id: "608202a748c64b1cec015005",
    refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU",
    timeRange: "short",
    description: "endpoint test",
    name: "testor"
}
methods.edit_user(function (result) {
    console.log(result);
    }, data2);
// data1 = {
//     threadID: "6062b12f43a0ad02805f72ae",
//     username: "Man1",
//     time: "9:34",
//     title: "Dayumm",
//     content: "Content test"
//     //threadTitle: "Talkin bout sumn"
// }

// methods.make_post(function (result) {
//     console.log(result);
// }, data1);
