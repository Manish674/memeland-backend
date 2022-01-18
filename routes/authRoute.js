const checkAuth = require("../middlewares/checkAuth");
const { Router } = require("express");
const { login, register, verification } = require("../controllers/authHanlder");

const router = Router();

// /api/v1/auth
router.route("/login").post(checkAuth, login);
router.route("/register").post(register);
router.route("/verification/:id").get(verification)

module.exports = router;
