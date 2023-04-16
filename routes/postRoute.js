const multer = require("multer");
const { Router } = require("express");

const expressCallback = require("../utils/expressCallback");
const handleMiddlwareCallback = require("../utils/expressMiddlwareCallback");

const { postsController, createPost } = require("../src/controller/post");

const { checkAuth } = require("../src/middleware/");

const router = Router();
// /api/v1/posts
// uploadImage,
router
  .route("/")
  .get(expressCallback(postsController))
  .post(
    [
      handleMiddlwareCallback(checkAuth),
      multer({ storage: multer.memoryStorage() }).single("file"),
    ],
    expressCallback(createPost)
  );
// router.route("/:id").get(getOnePost).put(updatePost).delete(deletePost);

module.exports = router;
