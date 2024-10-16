const axios = require("axios");

function CreateRemoteDataBaseApi(host, port) {
	const remoteDataBaseCall = axios.create({
		baseURL: `http://${host}:${port}`,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});

	async function request({ method, url, data }) {
		try {
			console.log("[DB] Request: ", { method, url, data });
			const response = await remoteDataBaseCall({ method, url, data });
			return response.data.body;
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.log("[DB] Axios Error: ", {
					message: err.message,
					code: err.code,
					config: err.config,
					// request: err.request,
					response: err.response
						? {
								status: err.response.status,
								headers: err.response.headers,
								data: err.response.data,
						  }
						: null,
				});
			} else {
				console.log("[DB] Error: ", err);
			}
			throw new Error(`Failed to make request: ${err.message}`);
		}
	}

	function get(table, id) {
		return request({
			method: "GET",
			url: `/${table}/${id}`,
		});
	}

	function query(table, query) {
		return request({
			method: "GET",
			url: `/query/${table}`,
			data: query,
		});
	}

	function list(table) {
		return request({
			method: "GET",
			url: `/${table}`,
		});
	}

	function get(table, id) {
		return request({
			method: "GET",
			url: `/${table}/${id}`,
		});
	}

	function query(table, query, join = "") {
		return request({
			method: "GET",
			url: `/query/${table}`,
			data: {
				query: query,
				join: join,
			},
		});
	}

	function create(table, data) {
		return request({
			method: "POST",
			url: `/${table}`,
			data,
		});
	}

	function update(table, data_id, data) {
		throw new Error("Not implemented");
	}

	async function upsert(table, data) {
		return request({
			method: "POST",
			url: `/${table}`,
			data,
		});
	}

	async function remove(table, id) {
		return request({
			method: "DELETE",
			url: `/${table}/${id}`,
		});
	}

	return {
		list,
		get,
		query,
		create,
		update,
		upsert,
		remove,
	};
}

module.exports = CreateRemoteDataBaseApi;
