const makeCheckAuth = require("./checkAuthentication");
const { findUser } = require("../use-cases/users/");
const { verifyToken } = require("../use-cases/token");

const checkAuth = makeCheckAuth({ findUser, verifyToken });

module.exports = { checkAuth };
