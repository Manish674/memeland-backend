const { Router } = require("express");
const {
  login,
  register,
  verification,
  validate,
} = require("../controllers/authHanlder");
const validateAccessToken = require("../middlewares/checkAuth");
const refreshTokenHandler = require("../controllers/refreshTokensHandler.js");

const router = Router();

// /api/v1/auth
router.route("/login").post(validateAccessToken, login);
router.route("/register").post(register);
router.route("/verification/:token").get(verification);
router.route("/refresh-access-token").get(refreshTokenHandler);
// router.route("/validate").get(checkAuth, validate);

module.exports = router;
