const express = require("express");
const router = express.Router();
const response = require("../../../utils/network/response");
const Controller = require("./index");

// Routes
router.post("/login", login);

// Internal functions
async function login(req, res) {
	try {
		let token = await Controller.login(req.body.username, req.body.password);
		response.success(req, res, token, 200);
	} catch (err) {
		response.error(req, res, err.message, 500);
	}
}

module.exports = router;
