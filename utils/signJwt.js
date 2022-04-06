const jwt = require("jsonwebtoken");

function signAccessToken(user) {
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}

function signRefreshToken(user) {
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
    },
    "@FASDT@aals%^&*$*&%^**%^&*NUlshit#%^Danigksn",
    {
      expiresIn: "90 days",
    }
  );

  return token;
}

module.exports = {
  signAccessToken,
  signRefreshToken,
};
