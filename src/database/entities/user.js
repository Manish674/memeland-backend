const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { unique: true, type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, select: false },
  //TODO CHANGE it to false
  isVerified: { type: Boolean, default: false },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dateOfBirth: Date,
  bio: { type: String },
  pfp: String,
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  console.log('this is hash -> ', hash)
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
