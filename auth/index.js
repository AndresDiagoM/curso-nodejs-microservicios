const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Returns a JWT token signed with the secret in the.env file, which expires in a certain time
 * @param {*} user 
 * @returns 
 */
function sign(user){
    const token = jwt.sign({user}, config.jwt.secret, {expiresIn: '15min'});
    return token;
}

/**
 *  This function verifies if the token is right and signed with the secret in the .env file
 * @param {*} token 
 * @returns Returns a boolean boolean, true if the token is right
 */
function verify(token){
    return jwt.verify(token, config.jwt.secret);
}

// functions for permission management
const check = {
    /**
     * This function checks if the token is correct
     * @param {*} req 
     * @param {*} owner 
     */
    own: function(req, owner){
        const decoded = decodeHeader(req);
        console.log("[Auth own]");
        console.log("Decoded id:"+decoded.id+" Owner:"+owner);

        // CHECK IF IT'S OWN OR ADMIN
        if(decoded.user.id !== owner){
            throw new Error('You can\'t do this');
        }
    }
}

/**
 * This function returns a boolean to check if the token is correct
 * @param {*} req 
 * @returns 
 */
function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return decoded;
}

function getToken(auth){ //The Token is like this -> Bearer xxxxx------xxxxx
    if(!auth){
        throw new Error("There's no token");
    }

    if(auth.indexOf('Bearer ') === -1){ // if there's no Bearer in the token
        throw new Error('Invalid format');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

module.exports = {
    sign,
    check,
}