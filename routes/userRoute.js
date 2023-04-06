const checkAuth = require("../middlewares/checkAuth");
const { Router } = require("express");

const { profile, profileById } = require('../controllers/userHandler');
const router = Router();

// /api/v1/auth
// router.route("/profile").get(checkAuth, profile);
// router.route("/profile/:id").get(profileById);

module.exports = router;
