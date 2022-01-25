const Post = require("../Entities/Post");
const User = require("../Entities/User");
const cloudinary = require("../utils/cloudinaryConfig");

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.status(200).json({ success: true, posts });
  } catch (e) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const getOnePost = async (req, res) => {
  res.status(200).json({ success: true, data: "single post" });
};

const createPost = async (req, res) => {
  // verify if user is logged In or not
  // getting it from checkAuth middleware

  // console.log(req.file.path);
  try {
    const { user } = res.locals;
    const { title } = req.body;
    const filePath = `${req.file.path}`;
    const result = await cloudinary.uploader.upload(filePath);
    const mediaUrl = result.secure_url;

    const createdPost = await Post.create({
      title,
      mediaUrl,
    });

    await User.findOneAndUpdate(
      { username: user.username },
      {
        $push: {
          posts: createdPost._id,
        },
      }
    );

    // console.log("Cloudinary result", result);
    res.status(200).json({ success: true, message: "Post created" });
  } catch (e) {
    res.status(400).json({ sucess: false, message: e.message });
  }
};

const updatePost = async (req, res) => {
  res.status(200).json({ success: true, data: "update" });
};

const deletePost = async (req, res) => {
  res.status(200).json({ success: true, data: "delete" });
};

module.exports = { getAllPost, getOnePost, updatePost, deletePost, createPost };
