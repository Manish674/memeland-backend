const { Router } = require("express");
// const {
// login,
// register,
// verification,
// validate,
// } = require("../controllers/authHanlder");
// const validateAccessToken = require("../middlewares/checkAuth");
// const refreshTokenHandler = require("../controllers/refreshTokensHandler.js");
// const checkAuth = require("../middlewares/checkAuth");

const expressCallback = require('../utils/expressCallback');

const { loginController } = require("../src/controller/");
const { signupController } = require('../src/controller/')

const router = Router();

// /api/v1/auth
// router.route("/login").post((req, res) => login(req.body));
// router.route("/register").post(register);
// router.route("/verification/:token").get(verification);
// router.route("/refresh-access-token").post(refreshTokenHandler);
// router.route("/validate").get(checkAuth, validate);

module.exports = router;
router.route('/login').post(expressCallback(loginController))
router.route('/register').post(expressCallback(signupController))
// router.route('/login').post(expressCallback)

//framework -> controller -> use cases -> Entities

