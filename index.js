const dotenv = require("dotenv");
dotenv.config();

const server = require("./app");
const connect = require("./src/database/dbConnect");

connect();

server.listen(process.env.PORT || 8000, () => {
  console.log("running");
});
