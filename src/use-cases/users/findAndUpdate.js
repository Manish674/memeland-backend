const findAndUpdateUser = ({ userDb }) => {
  // query is the user detail to search for
  return async (userInfo, updateInfo) => {
    return await userDb.findOneAndUpdate(userInfo, updateInfo);
  };
};

module.exports = findAndUpdateUser;
