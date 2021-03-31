/*
 * This is a sandbox for potential user designs.
 * Will copy over into User and delete when complete.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    artist: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: false
    },
    songID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: false });

const Song = mongoose.model('Song', songSchema);
module.exports = Song;