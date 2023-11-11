const store = require('../../../store/dummy');
const router = require('./network');

const TABLA = 'user';

function list () {
    return store.list(TABLA);
}

module.exports = {
    list,
}