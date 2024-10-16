const config = require("../../config");
const ctrl = require("./controller");

// const store = require('../../../store/mysql');
// const store = require('../../../store/postgres');

let store, cache;
console.log("[user] remoteDB: ", config.remoteDB);

if (config.remoteDB) {
	// store = require("../../../db/remote-mysql");
	store = require('../../../db/remote-postgres');
	cache = require("../../../db/remote-cache");
} else {
	// store = require("../../../db/mysql");
	store = require('../../../db/postgres');
	cache = require("../../../db/redis");
}

module.exports = ctrl(store);
