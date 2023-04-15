const findUser = ({ userDb }) => {
  return async (userInfo, args) => {
    if (args.showPassword) {
      return await userDb.find(userInfo).select("+password").exec();
    }

    return await userDb.find(userInfo).exec();
  };
};

module.exports = findUser;
