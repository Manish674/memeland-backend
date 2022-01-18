const Post = require("../Entities/Post");
const User = require("../Entities/User");

const getAllPost = async (req, res) => {
  res.status(200).json({ success: true, data: "all posts" });
};

const getOnePost = async (req, res) => {
  res.status(200).json({ success: true, data: "single post" });
};

const createPost = async (req, res, username) => {
  // verify if user is logged In or not
  // getting it from checkAuth middleware
  const { user } = res.locals;

  const { title, mediaUrl, desc, like, dislike } = req.body;

  const createdPost = await Post.create({
    title,
    mediaUrl,
    desc,
    like,
    dislike,
  });

  // adding id to author model
  await User.findOneAndUpdate(
    { username: user.username },
    {
      $push: {
        posts: createdPost._id,
      },
    }
  );

  res.status(200).json({ success: true, data: { post: { createdPost } } });
};

const updatePost = async (req, res) => {
  res.status(200).json({ success: true, data: "update" });
};

const deletePost = async (req, res) => {
  res.status(200).json({ success: true, data: "delete" });
};

module.exports = { getAllPost, getOnePost, updatePost, deletePost, createPost };
