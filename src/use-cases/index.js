const makeFindUser = require('./findUser');
const { userDb } = require('../database/entities/');
// import database

const findUser = makeFindUser({ userDb })

module.exports = { findUser }
