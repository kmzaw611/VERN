/*
 * This is a sandbox for potential user designs.
 * Will copy over into User and delete when complete.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    songID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: false
    }
}, { timestamps: true });

const Song = mongoose.model('Song', songSchema);
module.exports = Song;