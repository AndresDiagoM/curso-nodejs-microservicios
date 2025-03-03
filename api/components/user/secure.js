const auth = require("../../../utils/auth");

module.exports = function checkAuth(action) {
	function middleware(req, res, next) {
		switch (action) {
			case "update":
				const owner = req.body.id;
				auth.check.own(req, owner);
				next();
				break;
			case "follow":
				auth.check.token(req);
				next();
				break;
			default:
				next();
		}
	}

	return middleware;
};
