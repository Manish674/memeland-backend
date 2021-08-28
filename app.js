const bodyParser = require("body-parser");
const express = require("express");
const authRouter = require("./router/authRouter");
const cors = require("cors");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use("/api/auth", authRouter);

// handling undefined routes
app.all("*", (req, res, next) => {
  // const err = new Error("God damn it this route is not defined yet.");
  // err.status = "fail";
  // err.statusCode = 404;

  // Anything passed next is handled as error
  next(new AppError(`${req.url} is not defined yet!`, 404));
});

// Global error handler
app.use(errorController);

module.exports = app;
