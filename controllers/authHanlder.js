const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Entities/User");
const sendVerificationMail = require("../utils/sendVerificationMail");

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

  if (foundUser?.email === email) {
    return res
      .status(400)
      .json({ success: false, error: { message: "User already exists" } });
  }

  const createdUser = await User.create({
    username,
    password,
    email,
    dateOfBirth,
  });

  // console.log(createdUser._id);
  // TODO uncomment this thing
  sendVerificationMail(createdUser.email, createdUser._id);

  const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_DATE,
  });

  res.status(200).json({ success: true, token });
};

const verification = async (req, res) => {
  const { token } = req.params;

  try {
    const result = jwt.verify(token, process.env.EMAIL_SECRET);

    let foundUser = await User.findById(result.user_id);
    if (!foundUser) {
      res.status(400).json({ success: false, error: "Verification failed" });
    }

    foundUser.isVerified = true;
    await foundUser.save();

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(204).json({ success: false, error: "verificaton failed" });
  }
};

const validate = async (req, res) => {
  if (!res.locals.user) {
    return res
      .status(400)
      .json({ success: false, error: "authentication failed" });
  }

  res.status(200).json({ success: true });
};

module.exports = { login, register, verification, validate };
