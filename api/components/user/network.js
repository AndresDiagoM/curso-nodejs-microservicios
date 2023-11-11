const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const Controller = require('./controller');

router.get('/', function(req, res) {
    const list = Controller.list();
    response.success(req, res, list, 200);
});

module.exports = router;