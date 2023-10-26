const { Router } = require("express");
const {
	register,
	login,
	logout,
	requestResetPassword,
	resetPassword,
} = require("../service/userService");
const LoginLimiter = require("../middleware/rateLimit");

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", LoginLimiter, login);
userRouter.post("/logout", logout);
userRouter.post("requestresetpassword", requestResetPassword);
userRouter.post("/resetpassword", resetPassword);

module.exports = userRouter;
