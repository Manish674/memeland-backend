
const findUserById = ({ mongoose, userDb }) => {

  return async (id) => {
    return await userDb.findById(id).exec();
  }
}

module.exports = findUserById;
