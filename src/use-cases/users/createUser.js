const createUser = ({ userDb }) => {
  return async (userInfo) => {
    const {
      username,
      password,
      email,
      dateOfBirth,
    } = userInfo
    return await userDb.create({
      username,
      password,
      email,
      dateOfBirth,
    })
  }
}

module.exports = createUser; 
