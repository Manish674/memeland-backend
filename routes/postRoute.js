const { Router } = require("express");
// const checkAuth = require("../middlewares/checkAuth");
const {
  getAllPost,
  getOnePost,
  updatePost,
  deletePost,
  createPost,
} = require("../controllers/postHandler");

const router = Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log("storage shit ran");
    cb(null, "images/");
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname.split(".")[0]}.jpg`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      return cb(new Error("Please upload an image of type jpg jpeg png only"));
    }
    console.log("filter shit ran too");
    cb(undefined, true);
  },
});

// /api/v1/posts
router.route("/").get(getAllPost).post(upload.single("file"), createPost);
router.route("/:id").get(getOnePost).put(updatePost).delete(deletePost);

module.exports = router;
