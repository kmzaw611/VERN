/*
 * Reference: https://keithweaverca.medium.com/building-a-log-in-system-for-a-mern-stack-39411e9513bd
 *
 * This may seem like a redundant model because user.js already exists but it's not.
 * The user_session model keeps track of whether a user is logged in and whether to start
 * the app at the login page or the user's home page. It uses the MongoDB document ID
 * of a user as the identifying token. Something like this is necessary for login/logout
 * buttons to have actual functionality and state represented in the back-end.
 *
 * To clarify, a user_session object represents a user's particular session while he is logged
 * in and using the app, while a user object can refer to anyone who has registered for a VERN account.
 * This is the object that will be stored locally on the device as well.
 */

const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
  // userId is a user's MongoDB object id, although it can be any uniquely identifying value such as email
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  // Used to determine whether a user is logged in or not
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const UserSession = mongoose.model('UserSession', userSessionSchema);
module.exports = UserSession;
