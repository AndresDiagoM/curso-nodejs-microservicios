const express = require("express");
const app = express();
const config = require("../../config");
const router = require("./network");

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded,
app.use(express.json());

//* RUTAS
app.use("/", router);

app.listen(config.postgresService.port, () => {
	console.log(
		`\n PostgreSQL service listening on port ${config.postgresService.port}`
	);
});
