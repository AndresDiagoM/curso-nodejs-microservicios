const remote = require("./remote");
const config = require("../api/config");

module.exports = new remote(config.mysqlService.host, config.mysqlService.port);
