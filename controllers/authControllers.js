const User = require("../model/userModel");
const assignToken = require("../utils/assignToken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const createSendToken = (user, statusCode, res) => {
  const token = assignToken(user.name, user.email);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // TODO!important => uncomment it in the  production !!
    secure: false,
    httpOnly: false,
  };

  res.cookie("jwttoken", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide valid information", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email and password combo", 404));
  }

  createSendToken(user, 200, res);
});

exports.signUp = catchAsync(async function signUp(req, res) {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});
