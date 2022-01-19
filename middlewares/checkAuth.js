const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  try {
    let token = req.headers?.authentication;
    token = token.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        error: {
          message: "token not found",
        },
      });
    }

    const result = await jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = result;
    next();
  } catch (e) {
    res.status(500).json({ success: false, error: e });
  }
};

module.exports = checkAuth;
