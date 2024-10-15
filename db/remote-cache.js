const remote = require("./remote");
const config = require("../api/config");

module.exports = new remote(config.cacheService.host, config.cacheService.port);
