const path = require("path");
// const isLambda = !!process.env.HOST
const isLambda = process.env.HOST && !process.env.HOST.includes("localhost");

const swaggerSpec = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "NodeJs-Express-API",
			version: "1.0.0",
			description: "API description",
		},
		servers: [
			{
				url: process.env.HOST || "http://localhost:8080",
				description: isLambda
					? "Dev aws lambda server"
					: "Local development server",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	// apis: [`${path.join(__dirname, "../public/*.yml")}`],
	apis: ["./public/*.yml"],
};
// console.log(`Host: ${process.env.HOST}`)
// console.log("[swaggerSpec] ", swaggerSpec.apis);

module.exports = swaggerSpec;
