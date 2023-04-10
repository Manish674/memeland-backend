const makeLoginController = require("./authController");
const makeSignupController = require("./signupController");

const { findUser, createUser } = require('../use-cases/');
const token = require("../use-cases/token");

//TODO write diff use_case for bcrypt (compare, encrypt)
const bcrypt = require('bcrypt')
const encryptor = bcrypt;

//TODO controller --> usecase { pass use case in the login controller}
const loginController = makeLoginController({ findUser, encryptor })
const signupController = makeSignupController({ findUser, createUser, token })


module.exports = { loginController, signupController };
