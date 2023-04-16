const assignToken = (token) => {
  return async ({ user, expiresIn }) => {
    const tk = token.sign(
      {
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    return tk;
  }
}

module.exports = assignToken;

