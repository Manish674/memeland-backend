const makeUserController = require('./userController');
const makeUsersController = require("./usersController");

const { findUser, findUserById } = require('../../use-cases/users/')

const userController = makeUserController({ findUserById })
const usersController = makeUsersController({ findUser })

module.exports = { userController, usersController };


