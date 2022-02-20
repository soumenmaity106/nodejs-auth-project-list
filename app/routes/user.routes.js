module.exports = (app) => {
	const user = require("../controllers/user.controller");
	const { authJwt } = require("../middlewares");

	var router = require("express").Router();
	router.get("/", [authJwt.verifyToken], user.findAll);
	app.use("/api/user", router);
};
