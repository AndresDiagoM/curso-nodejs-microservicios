require ('dotenv').config();

module.exports = {
    api:{
        port: process.env.API_PORT || 3000
    },
    jwtSecret: process.env.JWT_SECRET,
}