const ctrl = require("./controller");

// Define the db to use
// const store = require('../../../db/mysql');
// const store = require('../../../db/postgres');
const store = require("../../../db/remote-postgres");
// const store = require("../../../db/remote-mysql");

module.exports = ctrl(store);
