const express = require('express');
const config = require('../config.js');
const app = express();

const post = require('./components/post/network.js');
const errors = require('../network/errors.js');


app.use(express.json());


// ROUTES
app.use('/api/post', post);


//Middlewares
app.use(errors);


app.listen(config.post.port, () => console.log('\nPost service running on port: '+config.post.port));