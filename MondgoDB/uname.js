var username;

const methods = {
    set_username: function (newu) {
        username = newu;
    },
    get_username: function (callback) {
        return callback(username);
    }
};
module.exports = methods;