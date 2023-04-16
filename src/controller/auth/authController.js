// framework --> controller --> use_case
// httpReq is framework
// loginUser is a useCase

const makeLoginController = ({ findUser, encryptor, assignToken }) => {
  return async (httpReq) => {
    try {
      const { email, password } = httpReq.body;

      if (!email || !password) {
        return {
          success: false,
          statusCode: 204,
          errorMessage: "incomplete data",
        };
      }

      const foundUser = await findUser({ email }, { showPassword: true });

      if (!foundUser) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: "user not found",
        };
      }

      // if (!foundUser.isVerified) {
      //   console.log("Why this ??")
      //   return {
      //     success: false,
      //     statusCode: 200,
      //     errorMessage: 'email is not verified'
      //   }
      // }

      const result = await encryptor.compare(password, foundUser[0].password);

      if (result !== true) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: "invalid credentials",
        };
      }

      // assign jwt token
      const tk = await assignToken({ user: foundUser, expiresIn: "1d" });

      return {
        success: true,
        statusCode: 200,
        body: {
          email: foundUser.email,
          username: foundUser.username,
          token: tk,
        },
      };
    } catch (e) {
      return {
        success: false,
        statusCode: 500,
        errorMessage: e.message,
      };
    }
  };
};

module.exports = makeLoginController;
