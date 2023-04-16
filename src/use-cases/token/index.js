const makeAssignToken = require('./assignAccessToken');
const makeVerifyToken = require('./verifyToken')
const jwt = require("jsonwebtoken")

const assignToken = makeAssignToken(jwt)
const verifyToken = makeVerifyToken(jwt)


module.exports = { assignToken, verifyToken };
