const makePostsController = require("./postsController");
const makeCreatePostController = require("./createPost");

const { findPost, imgUpload } = require("../../use-cases/posts/");

const postsController = makePostsController({ findPost });
const createPost = makeCreatePostController({ imgUpload });

module.exports = { postsController, createPost };
