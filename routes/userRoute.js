const { Router } = require("express");

const { usersController, userController } = require('../src/controller/user/')
const expressCallback = require("../utils/expressCallback");
const router = Router();

// /api/v1/auth
router.route("/profile").get(expressCallback(usersController));
router.route("/profile/:id").get(expressCallback(userController));

module.exports = router;
