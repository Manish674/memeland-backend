const { Router } = require("express");
const expressCallback = require('../utils/expressCallback');
const { signupController, loginController, emailVerificationController } = require("../controller/auth");

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
router.route('/verification/:tk').post(expressCallback(emailVerificationController))
// router.route('/login').post(expressCallback)

//framework -> controller -> use cases -> Entities

