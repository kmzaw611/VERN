/*
 * Group JSON schema, subject to change
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const groupSchema = new Schema({
    creatorID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    users: {
        type: Array,
        required: false
    },
    numUsers: {
        type: Number,
        required: false
    }
}, { timestamps: true });

groupSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

groupSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
