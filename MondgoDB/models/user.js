/*
 * This is a basic JSON structure that I made just to test
 * database connection. It is very subject to change.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;