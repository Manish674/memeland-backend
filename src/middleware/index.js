const multer = require("multer");

const makeCheckAuth = require("./checkAuthentication");
const makeFileUpload = require('./uploadFile');

const { findUser } = require("../use-cases/users/");
const { verifyToken } = require("../use-cases/token");


const checkAuth = makeCheckAuth({ findUser, verifyToken });

const fileUpload = makeFileUpload({ multer })

module.exports = { checkAuth, fileUpload };
