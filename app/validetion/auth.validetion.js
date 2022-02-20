const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
	body: Joi.object().keys({
		first_name: Joi.string().required().min(3).max(20),
		last_name: Joi.string().required().min(3).max(20),
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password),
	}),
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required().custom(password),
	}),
};

module.exports = {
	register,
	login,
};
