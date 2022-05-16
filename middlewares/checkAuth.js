const jwt = require("jsonwebtoken");

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

    res.locals.user = result;
    next();
  } catch (e) {
    res.status(200).json({ success: false, error: e });
  }
};

module.exports = validateAccessToken;
