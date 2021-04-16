/*
 * Do whatever you want with this file
 */

//If server file is outside the MondgoDB directory, need to change the path
const methods = require('./testClient');
//const prompt = require('prompt');

data1 = {
    threadID: "6062b12f43a0ad02805f72ae",
    username: "Man1",
    time: "9:34",
    title: "Dayumm",
    content: "Content test"
    //threadTitle: "Talkin bout sumn"
}

methods.make_post(function (result) {
    console.log(result);
}, data1);