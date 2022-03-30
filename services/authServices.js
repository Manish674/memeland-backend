const User = require("../Entities/User");

// userData is object { email, password, dateofBirth, username }
async function createUser(userData) {
  return await User.create(userData);
}

async function searchUserById(userId) {
  return await User.findById({
    id: userId,
  });
}

async function searchUser(userData) {
  return await User.findOne({
    userData,
  });
}

module.exports = {
  createUser,
  searchUserById,
  searchUser,
};
