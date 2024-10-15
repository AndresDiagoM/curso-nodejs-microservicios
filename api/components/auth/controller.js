const auth = require("../../../utils/auth");
const bcrypt = require("bcrypt");
const TABLA = "auth";

module.exports = function (injectedStore) {
	let store = injectedStore;
	if (!store) {
		store = require("../../../store/dummy");
	}

	async function login(username, password) {
		const authUser = await store.query(TABLA, { username: username });
		return bcrypt.compare(password, authUser.password).then((samePass) => {
			if (samePass) {
				// return token
				return auth.sign(authUser);
			} else {
				throw new Error("Incorrect information");
			}
		});
	}

	async function upsert(data) {
		const authData = {
			id: data.id,
		};

		if (data.username) {
			authData.username = data.username;
		}

		if (data.password) {
			authData.password = await bcrypt.hash(data.password, 5);
		}

		return store.upsert(TABLA, authData);
	}

	return {
		upsert,
		login,
	};
};
