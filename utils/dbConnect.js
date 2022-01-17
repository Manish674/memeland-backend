const mongoose = require("mongoose");
// process.env.URI

const connect = async () => {
  const client = await mongoose.connect("mongodb://127.0.0.1:27017/memeland");
  return client;
};

module.exports = connect;
