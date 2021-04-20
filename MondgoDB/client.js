/*
 * Do whatever you want with this file
 */

//If server file is outside the MondgoDB directory, need to change the path
const methods = require('./testClient');
//const prompt = require('prompt');

data1 = {
     refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU",
     timeRange: "short"
     //name: "test2"
 }

methods.top_songs(function (result) {
console.log(result);
}, data1);

// data2 = {
//     refreshToken: "AQCzVfJhvvDF8KvxRKP6ANQ_hfmYbqDdsVQ7XR0FlLlA4soBz6CnmK1HUIas6c9hQHpQ2sV_dDkfYApzJlVkoFMeyjsnVj7Kgdzzd4jG8OwUAbKvzPiVaM5ijhxRhkrdeLU",
//     timeRange: "short",
//     description: "endpoint test",
// }
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
