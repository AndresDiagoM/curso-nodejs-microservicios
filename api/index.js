const express = require('express');
const config = require('../config.js');
const app = express();

const user = require('./components/user/network');

app.use(express.json());

// ROUTES
app.use('/api/user', user);


//Miidlewares


app.listen(config.api.port, () => console.log('Server running on port 3000'));