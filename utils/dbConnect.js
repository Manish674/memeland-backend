const mongoose = require("mongoose");
// process.env.URI

const connect = async () => {
  const uri =
    process.env.NODE_ENV === "dev"
      ? "mongodb://127.0.0.1:27017/memeland"
      : process.env.MONGODB_URI;
  const client = await mongoose.connect(uri);
  return client;
};

module.exports = connect;
