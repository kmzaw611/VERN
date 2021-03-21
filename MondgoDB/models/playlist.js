/*
 * This is a sandbox for potential user designs.
 * Will copy over into User and delete when complete.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    playlistID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    Genres: {
        type: String,
        required: true
    },
    Songs: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;