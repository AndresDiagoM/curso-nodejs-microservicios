const pg = require("pg");
const remote = require("./remote");
const config = require("../api/config");
const { URL } = require("url");

// Pg pool
const { Pool } = pg;

// const parsedUrl = new URL(config.postgresService.URL);
// const host = parsedUrl.hostname;
// const port = parsedUrl.port;
// console.log("[remote-postgres] Using remote database: ", host, port);

// module.exports = new remote(host, port);

const db_postgres_conf = {
    host: config.postgresService.host,
    user: config.postgresService.user,
    password: config.postgresService.password,
    database: config.postgresService.database,
	ssl: {
        rejectUnauthorized: false
    }
};
console.log('[store Remote PostgreSQL] db_postgres_conf: ', db_postgres_conf);
// console.table(db_postgres_conf);

const pool = new Pool(db_postgres_conf);

pool.on('connect', () => {
    console.log('[store PostgreSQL] DB Connected!');
});

pool.on('error', (err) => {
    console.error('[db err]', err);
    process.exit(-1);
});

function list(table){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (err, res) => {
            if(err) return reject(err);
            resolve(res.rows);
        });
    });
}

function get(table, id){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, res) => {
            if(err) return reject(err);
            resolve(res.rows);
        });
    });
}

function insert(table, data){
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`);

    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders.join(',')}) RETURNING *`, values, (err, res) => {
            if(err) return reject(err);
            resolve(res.rows[0]);
        });
    });
}

function query(table, query, join){
    let joinQuery = '';
    if(join){
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    // Convert the query object to a format that PostgreSQL can understand
    const keys = Object.keys(query);
    const values = Object.values(query);
    const placeholders = keys.map((_, i) => `$${i + 1}`);

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${keys.join(' = ')} = ${placeholders.join(' AND ')}`, values, (err, res) => {
            if(err) return reject(err);
            if (join) {
                resolve(res.rows || null)
            } else {
                resolve(res.rows[0] || null)
            }
        });
    });
}

module.exports = {
    list,
    query,
    get,
    insert,
};

/*
INSERT INTO auth (username, password, first_name, last_name, email, role)
VALUES
('user1','password1', 'John', 'Doe', 'john.doe@example.com', 'user'),
('user2', password2', 'Jane', 'Doe', 'jane.doe@example.com', 'user'),
('user3',password3', 'Jim', 'Beam', 'jim.beam@example.com', 'user'),
('user4', 'password4', 'Jack', 'Daniels', 'jack.daniels@example.com', 'user'),
('user5', 'password5', 'Johnny', 'Walker', 'johnny.walker@example.com', 'user');
*/