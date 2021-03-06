const { Router } = require("express");
const {
  login,
  register,
  verification,
  validate,
} = require("../controllers/authHanlder");
const validateAccessToken = require("../middlewares/checkAuth");
const refreshTokenHandler = require("../controllers/refreshTokensHandler.js");
const checkAuth = require("../middlewares/checkAuth");

const router = Router();

// /api/v1/auth
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verification/:token").get(verification);
router.route("/refresh-access-token").post(refreshTokenHandler);
router.route("/validate").get(checkAuth, validate);

module.exports = router;
