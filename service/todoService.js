const { ObjectId } = require("mongodb");
const Todo = require("../model/todo");

const getTodos = async (req, res) => {
	const id = req.user.id;
	const role = req.user.role;

	try {
		let todos;
		if (role === "admin") {
			todos = await Todo.find().populate("createdBy", "_id username");
		} else if (role === "user") {
			todos = await Todo.find({ createdBy: id });
		}
		return res.status(200).json({ message: "To do List", todos });
	} catch (error) {
		console.error("Internal Server Error:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

const createTodos = async (req, res) => {
	const { title, progress, priority, date } = req.body;

	const owner = req.user.id;
	console.log(owner);

	try {
		const newTodo = new Todo({
			title,
			progress,
			priority,
			date,
			createdBy: owner,
		});
		await newTodo.save();
		res.status(200).json({
			message: "Success Create To Do List",
			data: newTodo,
		});
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

const updateTodos = async (req, res) => {
	try {
		const id = req.params.id;
		const { progress, date } = req.body;

		const todo = await Todo.findById(id);
		if (!todo) {
			return res.status(404).json({ message: "To Do List did not exist" });
		}

		const updatedTodos = await Todo.findOneAndUpdate(
			{ _id: id },
			{ progress, priority, date },
			{ new: true }
		);

		res.status(200).json({
			message: "To Do List successfully updated",
			data: updatedTodos,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error updating To Do List" });
	}
};

const deleteTodos = async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;
	const role = req.user.role;

	try {
		const todo = await Todo.findById(id);
		console.log(id);
		if (!todo) {
			return res.status(404).json({ message: "To Do Not Found" });
		}
		if (todo.createdBy.toString() !== userId && role !== "admin") {
			return res
				.status(403)
				.json({ message: "Only Admin and Creator can Delete task" });
		}
		await Todo.deleteOne({ _id: id });
		return res.status(200).json({ message: "To Do List Deleted Successfully" });
	} catch (error) {
		console.error("Internal Server Error:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = {
	getTodos,
	createTodos,
	updateTodos,
	deleteTodos,
};

// const getAllTodos = async (req, res) => {
// 	try {
// 		const todos = await Todo.find();

// 		res.status(200).json({
// 			message: "Complete To Do List",
// 			data: todos,
// 		});
// 	} catch (error) {
// 		res.status(401).json({ error: error.message });
// 	}
// };

// const getTodosByCreatedBy = async (req, res) => {
// 	const id = req.user.id;

// 	try {
// 		const todos = await Todo.find({ createdBy: id });
// 		return res
// 			.status(200)
// 			.json({ message: "To do list is created based on Role", todos });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: "Internal Server Error" });
// 	}
// };
