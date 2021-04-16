/*
 * Group JSON schema, subject to change
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const threadSchema = new Schema({
    threadID: {
        type: String,
        required: true
    },
    threadTitle: {
        type: String,
        required: true
    },
    posts: {
        type: Array,
        required: false
    }
}, { timestamps: true });

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;
