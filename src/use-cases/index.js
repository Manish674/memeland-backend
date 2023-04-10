const makeFindUser = require('./findUser');
const makeCreateUser = require('./createUser');
const { userDb } = require('../database/entities/');

const findUser = makeFindUser({ userDb })
const createUser = makeCreateUser({ userDb })

module.exports = { findUser, createUser }
