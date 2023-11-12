const express = require('express');
const config = require('../config.js');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

const auth = require('./components/auth/network');
const user = require('./components/user/network');



app.use(express.json());


// ROUTES
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/auth', auth);
app.use('/api/user', user);


//Miidlewares


app.listen(config.api.port, () => console.log('Server running on port 3000'));