const express = require("express");
const cors = require("cors");
const authRouter = require("./src/routes/authRoute");
const postRouter = require("./src/routes/postRoute");
const userRouter = require("./src/routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();

if (process.env.NODE_ENV !== "dev") {
  app.use(cors({ origin: "https://memeland.vercel.app", credentials: true }));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://memeland.vercel.app");
    next();
  });
} else if (process.env.NODE_ENV) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
// app.use("/api/v1/auth", authRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Page not found",
  });
});

module.exports = app;
