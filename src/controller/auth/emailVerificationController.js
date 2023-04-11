const sendEmailVerificationMail = ({ findUser, verifyToken }) => {
  return async (httpReq) => {
    const { token } = httpReq.params;

    try {
      const result = verifyToken(token, process.env.EMAIL_SECRET);

      let foundUser = await findUser({ _id: result.user_id });

      if (!foundUser) {
        return {
          status: false,
          statusCode: 200,
          errorMessage: "email verification failed"
        }
      }

      foundUser.isVerified = true;
      await foundUser.save();

      return {
        success: true,
        statusCode: 200,
        body: {
          message: "Email verified"
        }
      }
    } catch (e) {
      return { success: false, statusCode: 500, errorMessage: e.messaeg };
    }
  }
}

module.exports = sendEmailVerificationMail;
