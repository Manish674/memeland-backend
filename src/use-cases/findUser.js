const findUser = ({ userDb }) => {

  return async (userInfo) => {
    return await userDb.findOne(userInfo).exec()
  }
}

module.exports = findUser; 
