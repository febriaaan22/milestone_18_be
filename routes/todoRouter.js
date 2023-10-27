const { Router } = require("express");
const {
	getTodos,
	createTodos,
	updateTodos,
	deleteTodos,
	// getTodosByCreatedBy,
} = require("../service/todoService");
const authenticationMiddleware = require("../middleware/authentication-middleware");
const { checkRole } = require("../middleware/checkRole");

const todoRouter = Router();

todoRouter.get(
	"/",
	authenticationMiddleware,
	checkRole(["user", "admin"]),
	getTodos
);
// todoRouter.get(
// 	"/me",
// 	authenticationMiddleware,
// 	checkRole(["user", "admin"]),
// 	getTodosByCreatedBy
// );
todoRouter.post(
	"/",
	authenticationMiddleware,
	checkRole(["user", "admin"]),
	createTodos
);
todoRouter.put(
	"/:id",
	authenticationMiddleware,
	checkRole(["user", "admin"]),
	updateTodos
);
todoRouter.delete(
	"/:id",
	authenticationMiddleware,
	checkRole(["user", "admin"]),
	deleteTodos
);

module.exports = todoRouter;
