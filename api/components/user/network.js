const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

// Routes
router.get('/', list);
router.post('/follow', secure('follow'), follow);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

// Internal functions
async function list(req, res, next) {
    try{
        let users = await Controller.list();
        response.success(req, res, users, 200);
    }catch(err) {
        next(err);
    }
}
async function get(req, res, next) {
    try{
        let user = await Controller.get(req.params.id);
        response.success(req, res, user, 200);
    }catch(err) {
        next(err);
    }
}
async function upsert(req, res, next) {
    try{
        let user = await Controller.upsert(req.body);
        response.success(req, res, user, 200);
    }catch(err) {
        next(err);
    }
}
async function remove(req, res, next) {
    try{
        let user = await Controller.remove(req.params.id);
        response.success(req, res, user, 200);
    }catch(err) {
        next(err);
    }
}

async function follow(req, res, next) {
    try{
        // console.log(req.user.id);
        // console.log(req.user);
        // req.user is what the Bearer token has as payload, 
        //we asigned req.user in the auth/index.js middleware
        let data = await Controller.follow(req.user.id, req.body.follow);
        response.success(req, res, data, 201);
    }catch(err) {
        next(err);
    }
}

module.exports = router;