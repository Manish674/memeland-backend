const { postDb } = require("../../database/entities");
const cloudinary = require("../../utils/cloudinaryConfig");

const makeFindPost = require("./findPost");
const makeImgUpload = require("./imgUpload");
const makeSavePost = require("./savePost");
const makeDeletePost = require("./deletePost");

const findPost = makeFindPost({ postDb });
const imgUpload = makeImgUpload(cloudinary);
const savePost = makeSavePost({ postDb });
const deletePost = makeDeletePost({ postDb });

module.exports = { findPost, imgUpload, savePost, deletePost };
