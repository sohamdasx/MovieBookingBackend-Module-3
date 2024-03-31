const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.authenticate = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return null;
    }
    return user;
};
