const jwt = require("jsonwebtoken");
const config = require("../../api/config");
const error = require("../error");

/**
 * Returns a JWT token signed with the secret in the.env file, which expires in a certain time
 * @param {*} user
 * @returns
 */
function sign(user) {
	const token = jwt.sign({ user }, config.jwt.secret, { expiresIn: "15min" });
	return token;
}

/**
 *  This function verifies if the token is right and signed with the secret in the .env file
 * @param {*} token
 * @returns Returns a boolean boolean, true if the token is right
 */
function verify(token) {
	return jwt.verify(token, config.jwt.secret);
}

// functions for permission management
const check = {
	/**
	 * This function checks if the token is correct
	 * @param {*} req
	 * @param {*} owner
	 */
	own: function (req, owner) {
		const decoded = decodeHeader(req);
		console.log(
			"\n[Auth own]" + " Decoded id:" + decoded.user.id + " Owner:" + owner
		);
		// CHECK IF IT'S OWN OR ADMIN
		if (decoded.user.id !== owner) {
			throw error("You cannot do this. Invalid token", 401);
		}
	},
	token: function (req) {
		const decoded = decodeHeader(req);
		console.log("\n[Auth token]" + " Decoded id:" + decoded.user.id);
		if (decoded.user.id === undefined) {
			throw error("You cannot do this. Invalid token", 401);
		}
	},
};

/**
 * This function returns a boolean to check if the token is correct
 * @param {*} req
 * @returns
 */
function decodeHeader(req) {
	const authorization = req.headers.authorization || "";
	const token = getToken(authorization);
	const decoded = verify(token);
	req.user = decoded.user;
	return decoded;
}

function getToken(auth) {
	//The Token is like this -> Bearer xxxxx------xxxxx
	if (!auth) {
		throw new Error("There's no token");
	}

	if (auth.indexOf("Bearer ") === -1) {
		// if there's no Bearer in the token
		throw new Error("Invalid format");
	}

	let token = auth.replace("Bearer ", "");
	return token;
}

module.exports = {
	sign,
	check,
};
