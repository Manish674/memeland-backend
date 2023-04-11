const makeSignupController = ({ findUser, createUser, assignToken }) => {
  return async (httpReq) => {
    try {

      const { username, password, email, dateOfBirth } = httpReq.body;

      const foundUser = await findUser({ email })

      if (foundUser?.email === email) {
        return {
          success: false,
          statusCode: 200,
          errorMessage: "user already exists"
        }
      }

      const createdUser = await createUser({
        username,
        password,
        email,
        dateOfBirth,
      });

      //TODO use use-case ? or push them as dependency
      // sendVerificationMail(createdUser.email, createdUser._id);

      // const refreshToken = signRefreshToken({ email, username });

      // TODO figure out something
      // res.cookie("accessToken", accessToken);
      // res.cookie("refreshToken", refreshToken);
      // res.header("Access-Control-Allow-Credentials", "true");
      // res.set("accessToken", accessToken);

      return {
        success: true,
        statusCode: 200,
        body: {
          user: "created user"
        }
      }
    }
    catch (e) {
      return {
        success: false,
        statusCode: 200,
        errorMessage: e.message
      }
    }
  }
}

module.exports = makeSignupController;
