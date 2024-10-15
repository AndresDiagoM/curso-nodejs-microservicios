const config = require("../../config");
const ctrl = require("./controller");

// const store = require('../../../store/mysql');
// const store = require('../../../store/postgres');

let store, cache;
console.log("[user] remoteDB: ", config.remoteDB);

if (config.remoteDB) {
	store = require("../../../store/remote-mysql");
	// store = require('../../../store/remote-postgres');
	cache = require("../../../store/remote-cache");
} else {
	store = require("../../../store/mysql");
	// store = require('../../../store/postgres');
	cache = require("../../../store/redis");
}

module.exports = ctrl(store);
