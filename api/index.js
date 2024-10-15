const express = require("express");
const config = require("./config");
const app = express();
const logger = require("morgan");

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

// Microservices
const auth = require("./components/auth/network");
const user = require("./components/user/network");
const errors = require("../utils/network/errors.js");

// Middlewares
app.use(express.json());
app.use(logger("dev"));

// ROUTES
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/auth", auth);
app.use("/api/user", user);

//Error Middlewares
app.use(errors);

// Server
app.listen(config.api.port, () =>
	console.log("\nAPI service running on port: " + config.api.port)
);
