const accessToken = (token) => {
  return async ({ user, expiresIn }) => {
    const token = token.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    return token;
  }
}

export default accessToken;
