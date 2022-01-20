const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const formdataParser = require("multer")().fields([]);

const app = express();
app.use(formdataParser);
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

module.exports = app;
