// framework --> controller --> use_case 
// httpReq is framework
// loginUser is a useCase

const makeLoginController = ({ findUser, encryptor }) => {
  return async (httpReq) => {
    try {
      const { email, password } = httpReq.body;

      if (!email || !password) {
        return {
          success: false,
          statusCode: 204,
          errorMessage: 'incomplete data'
        }
      }

      const foundUser = await findUser({ email });

      if (!foundUser) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: 'user not found'
        }
      }

      if (!foundUser.isVerified) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: 'email is not verified'
        }
      }

      // const result = await encryptor.compare(password, foundUser.password);
      const result = true

      if (result !== true) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: 'invalid credentials'
        }
      }

      return {
        success: true,
        statusCode: 200,
        body: {
          email: foundUser.email,
          username: foundUser.username,
        },
      };
    } catch (e) {
      return {
        success: false,
        statusCode: 500,
        errorMessage: e.message
      }
    }
  }
}

module.exports = makeLoginController;
