const mongoose = require('mongoose');

const makeFindUser = require('./findUser');
const makeCreateUser = require('./createUser');
const makeFindUserbyId = require('./findUserbyId');
const { userDb } = require('../../database/entities/');

const findUser = makeFindUser({ userDb })
const createUser = makeCreateUser({ userDb })
const findUserById = makeFindUserbyId({ userDb, mongoose })

module.exports = { findUser, createUser, findUserById }
