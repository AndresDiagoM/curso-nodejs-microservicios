require('dotenv').config();

module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'platzi_social',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        user: process.env.POSTGRES_USER || 'root',
        password: process.env.POSTGRES_PASSWORD || 'root',
        database: process.env.POSTGRES_DATABASE || 'platzi_social',
    },
    postgresService: {
        host: process.env.POSTGRES_SRV_HOST || 'localhost',
        port: process.env.POSTGRES_SRV_PORT || 3001,
		user: process.env.POSTGRES_SRV_USER || 'root',
		password: process.env.POSTGRES_SRV_PASSWORD || 'root',
		database: process.env.POSTGRES_SRV_DATABASE || 'platzi_social',
        URL: process.env.POSTGRES_SRV_URL || 'http://localhost:3002',
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    remoteDB: process.env.REMOTE_DB || false,
    cacheService: {
        host: process.env.CACHE_SRV_HOST || 'localhost',
        port: process.env.CACHE_SRV_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-12203.c262.us-east-1-3.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 12203,
        password: process.env.REDIS_PASSWORD || 'RzBJFXDFby26sJTKrU8uBGPcgKie8mBh',
        user: process.env.REDIS_USER || 'andres',
        userPass: 'Redis_pass1000'
    }
}