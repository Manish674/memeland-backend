const Post = require("../Entities/Post");
const User = require("../Entities/User");
const cloudinary = require("../utils/cloudinaryConfig");

const getAllPost = async (req, res) => {
  try {
    // const posts = await Post.find();
    const posts = await Post.find().populate('postedBy');
    console.log("GetallPost route", posts)
    // const posts = await Post.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "username",
    //       foreignField: "user_id",
    //       as: "posts",
    //     },
    //   },
    // ]);
    res.status(200).json({ success: true, posts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const getOnePost = async (req, res) => {
  res.status(200).json({ success: true, post: "single post" });
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


    const postAuthor = await User.findOne(
      { username: user.username },
    );

    if (!postAuthor) return res.status(200).json({ success: false, error: "Check user"})

    const createdPost = await Post.create({
      title,
      mediaUrl,
      // without validating the username
      postedBy: postAuthor._id,
    });


    // console.log("Cloudinary result", result);
    res.status(200).json({ success: true, message: "Post created" });
  } catch (e) {
    res.status(400).json({ sucess: false, message: e.message });
  }
};

const updatePost = async (req, res) => {
  res.status(200).json({ success: true, updatedPost: "update" });
};

const deletePost = async (req, res) => {
  res.status(200).json({ success: true, deletedPost: "delete" });
};

module.exports = { getAllPost, getOnePost, updatePost, deletePost, createPost };
