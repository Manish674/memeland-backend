const makePostsController = require("./postsController");
const makeCreatePostController = require("./createPost");

const { findPost, imgUpload, savePost } = require("../../use-cases/posts/");
const { findAndUpdateUser, findUser } = require("../../use-cases/users/")

const postsController = makePostsController({ findPost });
const createPost = makeCreatePostController({ imgUpload, findUser, findAndUpdateUser, savePost  });

module.exports = { postsController, createPost };
