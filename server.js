const app = require("./app");
const dotenv = require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 8000;
const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((err) => {
    try {
      console.log("connected db");
    } catch (err) {
      console.log(err);
    }
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
