const makePostsController = require("./postsController");

const { findPost } = require("../../use-cases/posts/");

const postsController = makePostsController({ findPost })

module.exports = { postsController };
