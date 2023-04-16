const multer = require("multer");
const { Router } = require("express");

const expressCallback = require("../utils/expressCallback");
const handleMiddlwareCallback = require("../utils/expressMiddlwareCallback");

const {
  postsController,
  createPost,
  removePost,
} = require("../controller/post");

const { checkAuth } = require("../middleware/");

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
router
  .route("/:id")
  .delete(handleMiddlwareCallback(checkAuth), expressCallback(removePost));

module.exports = router;
