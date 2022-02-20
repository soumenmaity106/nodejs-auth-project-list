module.exports = (mongoose, mongoosePaginate) => {
	var schema = mongoose.Schema(
		{
			first_name: String,
			last_name: String,
			email: String,
			password: String,
		},
		{ timestamps: true }
	);

	schema.method("toJSON", function () {
		const { __v, _id, ...object } = this.toObject();
		object.id = _id;
		return object;
	});

	schema.plugin(mongoosePaginate);

	const User = mongoose.model("user", schema);
	return User;
};
