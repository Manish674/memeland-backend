const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
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

// const upload = multer({
// dest: "images/",
// filename(req, file, cb) {
//   cb(null, `${file.originalname.split(".")[0]}.jpg`);
// },
// });

exports.uploadImage = upload.single("file");
