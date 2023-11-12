const jwt = require('jsonwebtoken');
const config = require('../config');

function sign(user){
    const token = jwt.sign({user}, config.jwtSecret, {expiresIn: '15min'});
    return token;
}

module.exports = {
    sign,
}