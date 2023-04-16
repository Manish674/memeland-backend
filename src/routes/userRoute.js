const { Router } = require("express");

const { usersController, userController } = require("../controller/user/");
const expressCallback = require("../utils/expressCallback");
const expressMiddlewareCallback = require("../utils/expressMiddlwareCallback");
const { checkAuth } = require("../middleware/");
// const { checkAuth }  = require("../middlewares/");

const router = Router();

// /api/v1/auth
router
  .route("/profile")
  .get(expressMiddlewareCallback(checkAuth), expressCallback(usersController));

router
  .route("/profile/:id")
  .get(expressMiddlewareCallback(checkAuth), expressCallback(userController));

module.exports = router;
