const dotenv = require('dotenv')
dotenv.config()

const server = require("./app");
const connect = require('./utils/dbConnect');

connect()

server.listen(4000, () => {
  console.log('running')
})
