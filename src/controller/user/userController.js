const userController = ({ findUserById }) => {
  return async (httpReq) => {
    try {
      const { id } = httpReq.params;

      const foundUser = await findUserById(id)

      if (!foundUser)
        return { statusCode: 200, success: false, errorMessage: "user not found" };

      return { success: true, statusCode: 200, body: foundUser };
    } catch (e) {
      return {
        status: false,
        statusCode: 500,
        errorMessage: e.message
      }
    }
  }
}

module.exports = userController
