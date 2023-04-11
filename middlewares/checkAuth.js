const jwt = require("jsonwebtoken");
const { searchUser } = require("../services/authServices");

const validateAccessToken = async (req, res, next) => {
  try {
    let token = req.headers?.authentication;
    token = token.split(" ")[1];

    if (!token) {
      return res.status(200).json({
        error: {
          message: "token not found",
        },
      });
    }

    const result = jwt.verify(token, process.env.JWT_SECRET);

    const foundUser = await searchUser(result.email);

    if (!foundUser)
      res.status(200).json({ error: { message: "invalid token" } });

    const { email, username } = foundUser;
    res.locals.user = { email, username };
    next();
  } catch (e) {
    res.status(200).json({ success: false, error: e });
  }
};

module.exports = validateAccessToken;
