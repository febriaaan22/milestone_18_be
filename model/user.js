const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Permission",
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpires: {
		type: String,
	},
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
