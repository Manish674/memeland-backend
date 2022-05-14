const User = require("../Entities/User");
const jwt = require("jsonwebtoken");
const { signAccessToken } = require("../utils/signJwt");

const refreshAccessToken = (req, res) => {
  try {
    let refreshToken = req.headers?.authentication.split(" ")[1];

    const result = jwt.verify(
      refreshToken,
      "@FASDT@aals%^&*$*&%^**%^&*NUlshit#%^Danigksn"
    );

    const foundUser = User.find({
      email: result.email,
    });

    res.clearCookie("accessToken");

    const accessToken = signAccessToken(foundUser);

    res.status(200).json({
      success: true,
      message: "assigned new cookie",
        accessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, e });
  }
};

module.exports = refreshAccessToken;
