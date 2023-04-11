const postDb = require("../../database/entities")

const makeFindPost = require('./findPost')

const findPost = makeFindPost(postDb);


module.exports = { findPost };

