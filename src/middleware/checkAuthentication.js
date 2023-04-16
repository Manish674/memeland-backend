const checkAuthentication = ({ findUser, verifyToken }) => {
  return async (httpReq) => {
    try {
      let token = httpReq.headers.authentication;

      if (!token) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: "authentication token not found",
        };
      }

      token = token.split(" ")[1];
      const result = verifyToken({ tk: token });

      const foundUser = await findUser(result.email);

      if (!foundUser)
        return {
          success: false,
          statusCode: 200,
          errorMessage: "invalid token",
        };

      const { email, username } = foundUser[0];
      return { success: true, data: { user: { email, username } } };
    } catch (e) {
      return { success: false, statusCode: 500, errorMessage: e.message };
    }
  };
};

module.exports = checkAuthentication;
