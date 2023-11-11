const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('[users] Lista de mensajes');
});

module.exports = router;