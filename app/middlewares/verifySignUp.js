const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
	// Email
	const { email } = req.body;
	User.findOne({
		email: email,
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (user) {
			res.status(400).send({
				message: "Failed! Email is already in use!",
			});
			return;
		}

		next();
	});
};

const verifySignUp = {
	checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
