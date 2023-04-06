const makeLoginController = require("./authController");
const { findUser } = require('../use-cases/');

//TODO write diff use_case for bcrypt (compare, encrypt)
const bcrypt = require('bcrypt')
const encryptor = bcrypt;

//TODO controller --> usecase { pass use case in the login controller}
const loginController = makeLoginController({ findUser, encryptor })


module.exports = { loginController };
