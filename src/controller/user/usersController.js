const usersController = ({ findUser }) => {
  return async (httpReq) => {
    try {
      const result = await findUser()

      return { success: true, statusCode: 200, body: { user: result } };
    } catch (e) {
      return {
        success: false, statusCode: 500, errorMessage: e.message
      }
    }
  }
}

module.exports = usersController;
