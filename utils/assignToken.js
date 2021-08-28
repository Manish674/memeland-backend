const jwt = require("jsonwebtoken");

module.exports = function assignToken(name, email) {
  return jwt.sign({ name, email }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
};
