const config = require('../../../config');
const ctrl = require('./controller');

// const store = require('../../../store/mysql');
// const store = require('../../../store/postgres');

let store;
console.log('[user] remoteDB: ', config.remoteDB);
if(config.remoteDB) {
    // store = require('../../../store/remote-mysql');
    store = require('../../../store/remote-postgres');
} else {
    store = require('../../../store/mysql');
}

module.exports = ctrl(store);
