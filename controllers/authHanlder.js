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
        .status(200)
        .json({ success: false, error: { message: "User not found" } });
    }

    if (!foundUser.isVerified) {
      return res
        .status(200)
        .json({ success: false, error: { message: "Email is not verified" } });
    }

    const result = await bcrypt.compare(password, foundUser.password);

    if (result !== true) {
      return res
        .status(200)
        .json({ success: false, error: { message: "invalid credentials" } });
    }

    const token = jwt.sign(
      {
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      isVerified: foundUser.isVerified,
      user: {
        email: foundUser.email,
        username: foundUser.username,
        pfp: foundUser.pfp,
      },
      token,
    });
  } catch (e) {
    res.status(500).json({ success: false, error: { e, message: e.message } });
  }
};

const register = async (req, res) => {
  const { username, password, email, dateOfBirth } = req.body;
  const foundUser = await User.findOne({
    email: email,
  });

  if (foundUser?.email === email) {
    return res
      .status(200)
      .json({ success: false, message: "User already exists" });
  }

  const createdUser = await User.create({
    username,
    password,
    email,
    dateOfBirth,
  });

  sendVerificationMail(createdUser.email, createdUser._id);

  res.status(200).json({ success: true, message: "User created successfully" });
};

// Email verification
const verification = async (req, res) => {
  const { token } = req.params;

  try {
    const result = jwt.verify(token, process.env.EMAIL_SECRET);

    let foundUser = await User.findById(result.user_id);
    if (!foundUser) {
      res.status(200).json({ success: false, error: "Verification failed" });
    }

    foundUser.isVerified = true;
    await foundUser.save();

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(401).json({ success: false, error: "verificaton failed" });
  }
};

// Sending back user
const validate = async (req, res) => {
  if (!res.locals.user) {
    return res
      .status(200)
      .json({ success: false, error: "authentication failed" });
  }

  res.status(200).json({ success: true, user: res.locals.user });
};

module.exports = { login, register, verification, validate };
