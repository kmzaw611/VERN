/*
 * Group JSON schema, subject to change
 */
const mongoose = require('mongoose');
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
        required: true
    },
    numUsers: {
        type: Number,
        required: true
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
