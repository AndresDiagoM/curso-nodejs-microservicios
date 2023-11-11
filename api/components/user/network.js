const express = require('express');
const router = express.Router();

const response = require('../../../network/response');
const Controller = require('./index');

router.get('/', 
    async function(req, res) {
        try{
            let users = await Controller.list();
            response.success(req, res, users, 200);
        }catch(err) {
            response.error(req, res, err.message, 500);
        }
    }
);

router.get('/:id', 
    async function(req, res) {
        try{
            let user = await Controller.get(req.params.id);
            response.success(req, res, user, 200);
        }catch(err) {
            response.error(req, res, err.message, 500);
        }
    }
);

router.post('/', 
    async function(req, res) {
        try{
            let user = await Controller.upsert(req.body);
            response.success(req, res, user, 201);
        }catch(err) {
            response.error(req, res, err.message, 500);
        }
    }
);

router.put('/', 
    async function(req, res) {
        try{
            let user = await Controller.update(req.body);
            response.success(req, res, user, 200);
        }catch(err) {
            response.error(req, res, err.message, 500);
        }
    }
);

router.delete('/:id', 
    async function(req, res) {
        try{
            let user = await Controller.remove(req.params.id);
            response.success(req, res, user, 200);
        }catch(err) {
            response.error(req, res, err.message, 500);
        }
    }
);

module.exports = router;