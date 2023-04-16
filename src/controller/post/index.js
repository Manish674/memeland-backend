const makePostsController = require("./postsController");
const makeCreatePostController = require("./createPost");
const makeDeletePostController = require("./deletePost");

const {
  findPost,
  imgUpload,
  savePost,
  deletePost,
} = require("../../use-cases/posts/");
const { findAndUpdateUser, findUser } = require("../../use-cases/users/");

const postsController = makePostsController({ findPost });
const createPost = makeCreatePostController({
  imgUpload,
  findUser,
  findAndUpdateUser,
  savePost,
});

const removePost = makeDeletePostController({
  deletePost,
  findPost,
  findUser,
  findAndUpdateUser,
});

module.exports = { postsController, createPost, removePost };
