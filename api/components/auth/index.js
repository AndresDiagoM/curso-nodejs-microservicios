const ctrl = require('./controller');
// const store = require('../../../store/mysql');
// const store = require('../../../store/postgres');

const store = require('../../../store/remote-postgres');

module.exports = ctrl(store);