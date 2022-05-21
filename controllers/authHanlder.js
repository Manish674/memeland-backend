const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Entities/User");
const {
  createUser,
  searchUser,
  searchUserById,
} = require("../services/authServices");
const sendVerificationMail = require("../utils/sendVerificationMail");
const { signAccessToken, signRefreshToken } = require("../utils/signJwt.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await searchUser(email);

    if (!foundUser) {
      return res
        .status(200)
        .json({ success: false, error: { message: "User not found" } });
    }

    if (!foundUser.isVerified) {
      return res.status(200).json({
        success: false,
        error: { message: "Verify the goddamn email" },
      });
    }

    const result = await bcrypt.compare(password, foundUser.password);

    if (result !== true) {
      return res
        .status(200)
        .json({ success: false, error: { message: "invalid credentials" } });
    }

    res.status(200).json({
      success: true,
      isVerified: foundUser.isVerified,
      user: {
        email: foundUser.email,
        username: foundUser.username,
        pfp: foundUser.pfp,
      },
      //TODO send it as cookie
      // token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      error: { e, message: e.message },
    });
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

  const createdUser = await createUser({
    username,
    password,
    email,
    dateOfBirth,
  });

  sendVerificationMail(createdUser.email, createdUser._id);

  const accessToken = signAccessToken({ email, username });
  const refreshToken = signRefreshToken({ email, username });

  // TODO figure out something
  // res.cookie("accessToken", accessToken);
  // res.cookie("refreshToken", refreshToken);
  // res.header("Access-Control-Allow-Credentials", "true");
  // res.set("accessToken", accessToken);

  res.status(200).json({
    success: true,
    message: "User created successfully",
    accessToken,
    refreshToken,
  });
};

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
