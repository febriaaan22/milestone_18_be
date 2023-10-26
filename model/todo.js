const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	progress: {
		type: String,
		default: "Not Started",
		enum: ["Not Started", "On Progress", "Done"],
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
