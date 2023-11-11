const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index');

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', update);
router.delete('/:id', remove);

// Internal functions
async function list(req, res) {
    try{
        let users = await Controller.list();
        response.success(req, res, users, 200);
    }catch(err) {
        response.error(req, res, err.message, 500);
    }
}
async function get(req, res) {
    try{
        let user = await Controller.get(req.params.id);
        response.success(req, res, user, 200);
    }catch(err) {
        response.error(req, res, err.message, 500);
    }
}
async function upsert(req, res) {
    try{
        let user = await Controller.upsert(req.body);
        response.success(req, res, user, 200);
    }catch(err) {
        response.error(req, res, err.message, 500);
    }
}
async function update(req, res) {
    try{
        let user = await Controller.update(req.body);
        response.success(req, res, user, 200);
    }catch(err) {
        response.error(req, res, err.message, 500);
    }
}
async function remove(req, res) {
    try{
        let user = await Controller.remove(req.params.id);
        response.success(req, res, user, 200);
    }catch(err) {
        response.error(req, res, err.message, 500);
    }
}

module.exports = router;