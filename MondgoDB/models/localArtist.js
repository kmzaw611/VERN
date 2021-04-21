/*
 * Group JSON schema, subject to change
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const localSchema = new Schema({
    creatorID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: false
    },
    contactInfo: {
        type: String,
        required: false
    },
    updates: {
        type: Array,
        required: false
    }
}, { timestamps: true });

const Local = mongoose.model('Local', localSchema);
module.exports = Local;
