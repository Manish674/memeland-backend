const mongoose = require("mongoose");

const makeFindUser = require("./findUser");
const makeCreateUser = require("./createUser");
const makeFindUserbyId = require("./findUserbyId");
const makeFindAndUpdate = require("./findAndUpdate");

const { userDb } = require("../../database/entities/");

const findUser = makeFindUser({ userDb });
const createUser = makeCreateUser({ userDb });
const findUserById = makeFindUserbyId({ userDb });
const findAndUpdateUser = makeFindAndUpdate({ userDb });

module.exports = { findUser, createUser, findUserById, findAndUpdateUser };
