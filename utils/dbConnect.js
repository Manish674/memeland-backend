const mongoose = require("mongoose");

const connect = async () => {
  const client = await mongoose.connect(process.env.URI);
  return client;
};

module.exports = connect;
