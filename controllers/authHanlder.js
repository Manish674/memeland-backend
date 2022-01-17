const bcrypt = require("bcrypt");
const User = require("../Entities/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({
    email: email,
  });

  if (foundUser === null | foundUser === undefined)
    return res.status(204).json({ success: false, message: "user not found" });

  const result = bcrypt.compare(password, foundUser.password);

  if (result !== true)
    return res.status(204).json({ success: false, message: "user not found" });

  res.status(204).json({ success: true, data: foundUser });
};

const register = async (req, res) => {
  const { username, password, email, dateOfBirth } = req.body;
  await User.create({
    username,
    password,
    email,
    dateOfBirth,
  });

  // console.log(user);
  res.status(200).json({ success: true, data: "hello from register" });
};

module.exports = { login, register };
