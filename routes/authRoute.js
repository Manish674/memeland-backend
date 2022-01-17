const checkAuth = require("../middlewares/checkAuth");
const { Router } = require("express");
const { login, register } = require("../controllers/authHanlder");

const router = Router();

// /api/v1/auth
router.route("/login").post(checkAuth, login);
router.route("/register").post(register);

module.exports = router;
