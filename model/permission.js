const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
	role: {
		type: String,
		enum: ["user", "admin"],
	},
});

const Permission = mongoose.model("Permission", permissionSchema);
module.exports = Permission;
