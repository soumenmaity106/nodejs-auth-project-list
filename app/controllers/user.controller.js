const db = require("../models");
const User = db.user;

const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const offset = page ? page * limit : 0;
	return { limit, offset };
};

exports.findAll = async (req, res) => {
	try {
		const { page, size, first_name } = req.query;
		var condition = first_name
			? { first_name: { $regex: new RegExp(first_name), $options: "i" } }
			: {};
		const { limit, offset } = getPagination(page, size);
		let data = await User.paginate(condition, { offset, limit });
		res.send({
			totalItems: data.totalDocs,
			userdata: data.docs,
			totalPages: data.totalPages,
			currentPage: data.page - 1,
		});
	} catch (err) {
		res.status(500).send({
			message:
				err.message ||
				"Some error occurred while retrieving tutorials.",
		});
	}
};
