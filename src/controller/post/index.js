const makePostsController = require("./postsController");
const makeCreatePostController = require("./createPost");

const { findPost, imgUpload } = require("../../use-cases/posts/");
const { findAndUpdateUser } = require("../../use-cases/users/")

const postsController = makePostsController({ findPost });
const createPost = makeCreatePostController({ imgUpload, findAndUpdateUser  });

module.exports = { postsController, createPost };
