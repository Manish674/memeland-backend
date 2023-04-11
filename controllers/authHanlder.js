const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../Entities/User");
const {
  createUser,
  searchUser,
  searchUserById,
} = require("../services/authServices");
const sendVerificationMail = require("../utils/sendVerificationMail");
const { signAccessToken, signRefreshToken } = require("../utils/signJwt.js");

// Email verification
const verification = async (req, res) => {
  const { token } = req.params;

  try {
    const result = jwt.verify(token, process.env.EMAIL_SECRET);

    let foundUser = await searchUserById(result.user_id);

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
  console.log("it hit hard");
  if (process.env.NODE_ENV !== "dev") {
    res.header("Access-Control-Allow-Origin", "https://memeland.vercel.app");
  }

  if (!res.locals.user) {
    return res
      .status(200)
      .json({ success: false, error: "authentication failed" });
  }

  res.status(200).json({ success: true, user: res.locals.user });
};

module.exports = {
  login,
  register,
  verification,
  validate,
};
