const User = require('../models/User');

exports.authenticate = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }
    if (user.password !== password) {
        return null;
    }
    return user;
};