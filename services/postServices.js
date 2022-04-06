const cloudinary = require("../utils/cloudinaryConfig");
const Post = require("../Entities/Post");
const User = require("../Entities/User");

async function getPostsByUser() {
  return await Post.find().populate("postedBy");
}

async function getPostById(postId) {
  return await Post.findById({ postId });
}

async function findPostAuthor(username) {
  return await User.findOne({ username });
}

async function createPost(data) {
  return Post.create(
    data
    // title,
    // mediaUrl,
    // postedBy: postAuthor._id,
  );
}

async function uploadImgToCloudinary(imgPath) {
  const result = await cloudinary.uploader.upload(imgPath);
  const mediaUrl = result.secure_url;

  return mediaUrl;
}

module.exports = {
  getPostsByUser,
  getPostById,
  findPostAuthor,
  createPost,
  uploadImgToCloudinary,
};
