/*
 * This is a sandbox for potential user designs.
 * Will copy over into User and delete when complete.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    numID: {
        type: Number,
        required: true;
    },
    username: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    followers: {
        type: String,
        required: false
    },
    following: {
        type: String,
        require: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;