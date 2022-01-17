const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/v1/auth", authRouter);

module.exports = app;
