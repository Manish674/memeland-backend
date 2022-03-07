const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const userRouter = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://memeland.vercel.app/");
  next();
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Page not found",
  });
});

module.exports = app;
