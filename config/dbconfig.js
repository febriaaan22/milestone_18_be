const mongoose = require("mongoose");
const Permission = require("../model/permission");
const { MONGO_URI } = require("./config");

async function seedPermissions() {
	try {
		const roles = ["user", "admin"];

		for (const role of roles) {
			const existingRole = await Permission.findOne({ role: role });
			if (!existingRole) {
				const newRole = new Permission({ role: role });
				await newRole.save();
			}
		}
	} catch (error) {
		console.error("Error seeding permissions:", error);
	}
}

const dbConnection = () => {
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Success connected to MongoDB");
			seedPermissions();
		})
		.catch((err) => {
			console.error(err);
		});
	console.log(MONGO_URI);
};

module.exports = dbConnection;
