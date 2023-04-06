const { Router } = require("express");
const validateAccessToken = require("../middlewares/checkAuth");
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
// uploadImage,
// router
//   .route("/")
//   .get(validateAccessToken, getAllPost)
//   .post([validateAccessToken, uploadImage], createPost);
// router.route("/:id").get(getOnePost).put(updatePost).delete(deletePost);

module.exports = router;
