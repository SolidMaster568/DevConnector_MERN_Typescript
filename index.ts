import express from "express";

import connectDB from "./config/db";
import connectRoutes from "./config/routes";
import applyMiddleWares from "./config/middlewares";
import path from "path";

const app = express();
applyMiddleWares(app);
connectRoutes(app);

if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.send(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

try {
	connectDB();
	app.listen(process.env.PORT || 4000);
} catch (error) {
	console.log("failed to connect");
	process.exit();
}
