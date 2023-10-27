require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { applyHelmet } = require("./middleware/helmet.js");
const databaseMddleware = require("./middleware/database-middleware.js");
const authMiddleware = require("./middleware/authentication-middleware.js");
const todoRouter = require("./routes/todoRouter.js");
const userRouter = require("./routes/userRouter.js");
const dbConnection = require("./config/dbconfig.js");
const { applyCors } = require("./middleware/cors.js");

const app = express();
dbConnection();
applyCors(app);
applyHelmet(app);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(databaseMddleware);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(databaseMddleware);

app.use("/user", userRouter);
app.use("/todo", authMiddleware, todoRouter);

app.listen(3000, () => console.log("Server is running on port 3000"));

// exports.week_18_irengfebrian = functions.https.onRequest(app);
