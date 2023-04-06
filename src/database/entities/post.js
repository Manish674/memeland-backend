const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, length: 150 },
  mediaUrl: { type: String, required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  desc: { type: String },
  like: Number,
  dislike: Number,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
