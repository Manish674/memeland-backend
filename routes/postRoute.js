const { Router } = require("express");
const checkAuth = require("../middlewares/checkAuth");
const {
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
  createPost,
} = require("../controllers/postHandler");

const router = Router();

// /api/v1/posts
router.route("/").get(getAllPost).post(createPost);
router.route("/:id").get(getOnePost).put(updatePost).delete(deletePost);

module.exports = router;
