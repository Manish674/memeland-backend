const postDb = require("../../database/entities");
const cloudinary = require('../../../utils/cloudinaryConfig');

const makeFindPost = require("./findPost");
const makeImgUpload = require("./imgUpload");
const findPost = makeFindPost(postDb);
const imgUpload = makeImgUpload(cloudinary);

module.exports = { findPost, imgUpload };
