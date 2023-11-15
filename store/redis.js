const redis = require('redis');
const config = require('../config');

//db-name ANDRESFELIPE-free-db

// const encodedPassword = base64.encode(config.redis.userPass);
const url = `redis://${config.redis.user}:${config.redis.userPass}@${config.redis.host}:${config.redis.port}`;
console.log(url);
const client = redis.createClient({
    url: url
});
client.on('error', function (err) {
    console.log('Error ' + err);
});

(async () => {
    await client.connect();
    console.log('Conectado a REDIS');
}
)();

async function list(table) {
    const value = await client.get(table);
    return JSON.parse(value);
}

async function get(table, id) {
    const value = await client.get(`${table}_${id}`);
    return JSON.parse(value);
}

async function upsert(table, data) {
    if (typeof table !== 'string') {
        throw new TypeError('Expected table to be a string');
    }
    if (typeof data !== 'object' || data === null) {
        throw new TypeError('Expected data to be an object');
    }

    let key = table;
    if (data && data.id) {
        key += '_' + data.id;
    }
    await client.set(key, JSON.stringify(data), 'EX', 10); // 3600 seconds = 1 hour
    return true;
}

module.exports = {
    list,
    get,
    upsert,
}