/*
 * This Script is now in use to connect to the database.
 * This is the only script with the login uri
 */
const mongoose = require('mongoose');
const uri = "mongodb+srv://ec99:verndev123@cluster0.y4whb.mongodb.net/Vern?retryWrites=true&w=majority";
const methods = {
    connect: function (callback) {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then((result) => {
                console.log("Database connected!");
                return callback(200);
            }).catch((err) => {
                console.log(err);
                return callback(404);
            });
    }
};
module.exports = methods;