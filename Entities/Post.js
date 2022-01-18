const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: String, length: 150 },
  mediaUrl: { type: String, required: true },
  desc: { type: String },
  like: Number,
  dislike: Number,
});

const Post = mongoose.model("Post", userSchema);

module.exports = Post;
