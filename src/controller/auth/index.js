const makeLoginController = require("./authController");
const makeSignupController = require("./signupController");
const makeEmailVerificationController = require("./emailVerificationController");

const { findUser, createUser } = require('../use-cases/');
const { assignToken, verifyToken } = require("../../use-cases/token/");

//TODO write diff use_case for bcrypt (compare, encrypt)
const bcrypt = require('bcrypt')
const encryptor = bcrypt;

//TODO controller --> usecase { pass use case in the controller}
const loginController = makeLoginController({ findUser, encryptor })
const signupController = makeSignupController({ findUser, createUser, assignToken })
const emailVerificationController = makeEmailVerificationController({ findUser, verifyToken })


module.exports = { loginController, signupController, emailVerificationController };
