const mysql = require("mysql");

const config = require("../api/config");

const dbconf = {
	host: config.mysql.host,
	user: config.mysql.user,
	password: config.mysql.password,
	database: config.mysql.database,
};

let connection;

function handleCon() {
	connection = mysql.createConnection(dbconf);

	connection.connect((err) => {
		if (err) {
			console.error("[db err]", err);
			setTimeout(handleCon, 2000);
		} else {
			console.log("[store MySQL] DB Connected!");
		}
	});

	connection.on("error", (err) => {
		console.error("[db err]", err);
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			handleCon();
		} else {
			throw err;
		}
	});
}

handleCon();

function list(table) {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${table}`, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
}

function get(table, id) {
	return new Promise((resolve, reject) => {
		connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
			if (err) return reject(err);
			resolve(data);
		});
	});
}

function insert(table, data) {
	return new Promise((resolve, reject) => {
		connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

function update(table, data) {
	const { id, ...updateData } = data;
	return new Promise((resolve, reject) => {
		connection.query(
			`UPDATE ${table} SET ? WHERE id=?`,
			[updateData, id],
			(err, result) => {
				if (err) return reject(err);
				resolve(result);
			}
		);
	});
}

async function upsert(table, data) {
	// search if data.id exists
	const result = await get(table, data.id);
	console.log(result);
	if (result.length === 0) {
		return update(table, data);
	} else {
		return insert(table, data);
	}
}

function query(table, query, join) {
	let joinQuery = "";
	if (join) {
		const key = Object.keys(join)[0];
		const val = join[key];
		joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
	}
	return new Promise((resolve, reject) => {
		connection.query(
			`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
			query,
			(err, res) => {
				if (err) return reject(err);
				if (join) {
					resolve(res || null);
				} else {
					resolve(res[0] || null);
				}
			}
		);
	});
}

function remove(table, id) {
	return new Promise((resolve, reject) => {
		connection.query(`DELETE FROM ${table} WHERE id=?`, id, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

module.exports = {
	list,
	get,
	insert,
	upsert,
	remove,
	query,
};
