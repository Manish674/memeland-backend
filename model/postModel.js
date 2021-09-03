const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({});

const User = mongoose.model("user", userSchema);

module.exports = User;
