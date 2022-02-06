const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, length: 150 },
  mediaUrl: { type: String, required: true },
  user_id: { type: String, required: true },
  desc: { type: String },
  like: Number,
  dislike: Number,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
