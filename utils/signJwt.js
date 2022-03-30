const jwt = require("jsonwebtoken");

function signJwt(user) {
  const token = jwt.sign(
    {
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "11d" }
  );
  return token;
}

module.exports = {
  signJwt,
};
