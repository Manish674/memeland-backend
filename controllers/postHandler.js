const Post = require("../Entities/Post");
const User = require("../Entities/User");
const { uploadImgToCloudinary } = require("../services/postServices");
const postServices = require("../services/postServices");

const getAllPost = async (req, res) => {
  try {
    // const posts = await Post.find();
    const posts = await Post.find().populate("postedBy");
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

  try {
    const user = res.locals.user;
    const { title } = req.body;
    const imgPath = `${req.file.path}`;

    const mediaUrl = await uploadImgToCloudinary(imgPath);

    const postAuthor = await User.findOne({
      username: user.username,
    });

    if (!postAuthor)
      return res.status(200).json({ success: false, error: "user not found" });

    const createdPost = await postServices.createPost({
      title,
      mediaUrl,
      postedBy: postAuthor._id,
    });

    await User.findOneAndUpdate(
      { username: user.username },
      {
        $push: {
          posts: [createdPost._id],
        },
      }
    );

    res.status(200).json({ success: true, message: "Post created" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ sucess: false, e });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedPost = await Post.findByIdAndUpdate({ _id: id }, data);
    console.log(updatedPost);

    res.status(200).json({ success: true, updatedPost: "update" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ sucess: false, message: e.message });
  }
};

const deletePost = async (req, res) => {
  // delete the link from the db
  // delete the img from the cloudinary
  // remove it from the collection
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ sucess: false, message: e.message });
  }
};

module.exports = { getAllPost, getOnePost, updatePost, deletePost, createPost };
