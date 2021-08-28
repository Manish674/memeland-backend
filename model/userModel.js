const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    unique: [true, "username already taken"],
    required: [true, "Provide a valid name"],
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide valid email"],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "User should have a password"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same",
    },
  },
});

// password encryption
userSchema.pre("save", async function (next) {
  // only runs when password was modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  loginFormPassword,
  dbPassword
) {
  return await bcrypt.compare(loginFormPassword, dbPassword);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
