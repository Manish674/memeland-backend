const jwt = require("jsonwebtoken");

function signAccessToken(user) {
  console.log("user received by access token", user);
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
  console.log("user received by refresh token", user);
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
