const { Router } = require("express");
// const checkAuth = require("../middlewares/checkAuth");
const { uploadImage } = require("../middlewares/upload");
const {
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
  createPost,
} = require("../controllers/postHandler");

const router = Router();
// /api/v1/posts

router.route("/").get(getAllPost).post(uploadImage, createPost);
router.route("/:id").get(getOnePost).put(updatePost).delete(deletePost);

module.exports = router;
