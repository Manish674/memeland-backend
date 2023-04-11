const findUser = ({ userDb }) => {
  return async (userInfo) => {
    return await userDb.find(userInfo).exec();
  }
}

module.exports = findUser; 
