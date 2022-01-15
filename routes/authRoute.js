const { Router } = require("express");
const { login, register  } = require("../controllers/authHanlder");

const router = Router();

// /api/v1/auth
router.route('/authenticate').get(login).post(register)

module.exports = router
