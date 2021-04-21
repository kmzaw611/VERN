/*
 * Do whatever you want with this file
 */

//If server file is outside the MondgoDB directory, need to change the path
const methods = require('./testClient');
//const prompt = require('prompt');

data1 = {
    creatorID: "6062b12f43a0ad02805f72ae",
    name: "Fart",
    genre: "Fart",
    location: "Fart",
    contactInfo: "Fart",
    biography: "Fart",
    wtf: "shouldnt happen"
    //threadTitle: "Talkin bout sumn"
}

methods.edit_local(function (result) {
    console.log(result);
}, data1);