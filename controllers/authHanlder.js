const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Entities/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({
      email: email,
    });

    if (!foundUser) {
      return res
        .status(400)
        .json({ success: false, error: { message: "User not found" } });
    }

    const result = await bcrypt.compare(password, foundUser.password);

    if (result !== true) {
      return res
        .status(400)
        .json({ success: false, error: { message: "invalid credentials" } });
    }

    res.status(200).json({ success: true, data: { foundUser } });
  } catch (e) {
    res.status(205).json({ success: false, data: "user not found" });
  }
};

const register = async (req, res) => {
  const { username, password, email, dateOfBirth } = req.body;
  const foundUser = await User.findOne({
    email: email,
  });

  if (foundUser.email === email) {
    return res
      .status(400)
      .json({ success: false, error: { message: "User already exists" } });
  }

  await User.create({
    username,
    password,
    email,
    dateOfBirth,
  });

  // TODO  when user is registered send back jwt token
  const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_DATE,
  });

  res.status(200).json({ success: true, token });
};

module.exports = { login, register };
