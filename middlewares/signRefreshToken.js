const signRefreshToken = async (foundUser) => {
  try {
    const token = jwt.sign(
      {
        username: foundUser.username,
        email: foundUser.email,
      },
      process.env.REFRESH_JWT_SECRET,
      { expiresIn: "1y" }
    );

    return token;
  } catch (e) {
    console.log(e);
  }
};

module.export = {
  signRefreshToken,
};
