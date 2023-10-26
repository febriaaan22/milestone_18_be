require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { applyHelmet } = require("./middleware/helmet");
const databaseMddleware = require("./middleware/database-middleware");
const authMiddleware = require("./middleware/authentication-middleware");
const todoRouter = require("./routes/todoRouter");
const userRouter = require("./routes/userRouter");
const dbConnection = require("./config/dbconfig");
const { applyCors } = require("./middleware/cors");

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

app.use("/todo", todoRouter);
app.use("/user", userRouter);

app.listen(3000, () => console.log("Server is running on port 3000"));

// exports.week_18_irengfebrian = functions.https.onRequest(app);
