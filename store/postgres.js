const { Pool } = require('pg');
const config = require('../config');


const db_postgres_conf = {
    host: config.postgres.host,
    user: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.database,
};
console.log('[store PostgreSQL] db_postgres_conf: ', db_postgres_conf);
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