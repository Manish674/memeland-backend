const auth = (() => {
  // userService --> user database
  // cryptingService --> bcrypt 
  async function login({ email, password }, userService, cryptingService) {
    try {
      const foundUser = await userService.findOne({ email });

      if (!foundUser) {
        return ({
          success: false,
          status: 200,
          error: 'user not found'
        })
      }

      if (!foundUser.isVerified) {
        return ({
          success: false,
          error: { message: "Verify the goddamn email" },
        });
      }

      const result = await cryptingService.compare(password, foundUser.password);

      if (result !== true) {
        return ({
          success: false,
          error: 'invalid credentials'
        })
      }

      return ({
        success: true,
        isVerified: foundUser.isVerified,
        user: {
          email: foundUser.email,
          username: foundUser.username,
          pfp: foundUser.pfp,
        },
      });
    } catch (e) {
      console.log(e);
      return ({
        status: 500,
        e: e.message
      })
    }
  }

  async function register() {
    console.log('Register function')
  }

  return {
    login,
    register
  }
})();

module.exports = auth;
