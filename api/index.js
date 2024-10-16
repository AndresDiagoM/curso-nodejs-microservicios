const express = require("express");
const config = require("./config");
const app = express();
const logger = require("morgan");
const path = require("path");

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("../utils/swagger.js");
const swaggerDocs = swaggerJsdoc(swaggerOptions);
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

// Microservices
const auth = require("./components/auth/network");
const user = require("./components/user/network");
const errors = require("../utils/network/errors.js");

// Middlewares
app.use(express.json());
app.use(logger("dev"));

// ROUTES
app.use("/static", express.static(path.join(__dirname, "public")));
// app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, {
		// swaggerUrl: "./public/swagger.yml",
        customCssUrl: CSS_URL
    })
);
app.use("/api/auth", auth);
app.use("/api/user", user);
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello World</title>
        </head>
        <body>
            <h1>Hello World!</h1>
        </body>
        </html>
    `);
});

//Error Middlewares
app.use(errors);

// Server
app.listen(config.api.port, () =>
	console.log("\nAPI service running on port: " + config.api.port)
);
