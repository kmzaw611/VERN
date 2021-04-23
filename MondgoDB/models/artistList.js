const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const artistListSchema = new Schema({
    identifier: {
        type: String,
        required: false
    },
    artists: {
        type: Array,
        required: false
    }
}, { timestamps: true });

const ArtistList = mongoose.model('ArtistList', artistListSchema);
module.exports = ArtistList;
