const express = require("express");
const router = express.Router();
const response = require("../../../utils/network/response");
const Controller = require("./index");

// Routes
router.post("/login", login);
router.post("/create", create);

// Internal functions
async function login(req, res) {
	console.log("[AUTH] Login request: ", req.body);
	try {
		let token = await Controller.login(req.body.username, req.body.password);
		response.success(req, res, token, 200);
	} catch (err) {
		response.error(req, res, err.message, 500);
	}
}

async function create(req, res) {
	console.log("[AUTH] Create request: ", req.body);
	try {
		let result = await Controller.upsert(req.body);
		response.success(req, res, result, 201);
	} catch (err) {
		response.error(req, res, err.message, 500);
	}
}

module.exports = router;
