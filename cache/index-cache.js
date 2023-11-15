const express = require("express");
const app = express();
const config = require('../config')
const router = require('./network')


app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded, 
app.use(express.json())

//* RUTAS
app.use('/', router)

app.listen(config.cacheService.port, () => {
    console.log(`\n Redis service listening on port ${config.cacheService.port}`);
})