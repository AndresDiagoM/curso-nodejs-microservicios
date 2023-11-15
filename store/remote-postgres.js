const remote = require('./remote');
const config = require('../config');

console.log('[remote-postgres] config.postgresService: ', config.postgresService);
module.exports = new remote(config.postgresService.host, config.postgresService.port);