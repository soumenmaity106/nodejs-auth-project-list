const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	const user = new User({
		first_name: first_name,
		last_name: last_name,
		email: email,
		password: bcrypt.hashSync(password, 8),
	});
	let usersave = await user.save();
	if (usersave) {
		res.send({
			message: "User was registered successfully!",
		});
	}
};

exports.signin = (req, res) => {
	const { email, password } = req.body;
	User.findOne({
		email: email,
	})
		.populate("roles", "-__v")
		.exec((err, user) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			var passwordIsValid = bcrypt.compareSync(password, user.password);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!",
				});
			}
			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400, // 24 hours
			});
			res.status(200).send({
				id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				accessToken: token,
			});
		});
};
