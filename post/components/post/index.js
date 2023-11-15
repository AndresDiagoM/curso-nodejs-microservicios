const ctrl = require('./controller');
// const store = require('../../../store/mysql');
const store = require('../../../store/remote-postgres');
// const store = require('../../../store/postgres');

module.exports = ctrl(store);