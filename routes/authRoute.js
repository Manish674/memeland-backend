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

const authAdapter = require('../src/adapters/authAdapter')
const { login } = authAdapter;

const router = Router();

// /api/v1/auth
// router.route("/login").post((req, res) => login(req.body));
// router.route("/register").post(register);
// router.route("/verification/:token").get(verification);
// router.route("/refresh-access-token").post(refreshTokenHandler);
// router.route("/validate").get(checkAuth, validate);

module.exports = router;

//router should know nothing about the login function
//nor should login function know anything about req and res object
//adapter(req, res) -> login({req.body.email, req.body.password})
router.route('/login').post()
