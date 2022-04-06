const User = require("../Entities/User");
const jwt = require("jsonwebtoken");
const { signAccessToken } = require("../utils/signJwt");

const refreshAccessToken = (req, res) => {
  try {
    let refreshToken = req.headers?.authorization.split(" ")[1];

    const result = jwt.verify(
      refreshToken,
      "@FASDT@aals%^&*$*&%^**%^&*NUlshit#%^Danigksn"
    );

    const foundUser = User.find({
      email: result.email,
    });

    res.clearCookie("accessToken");

    const accessToken = signAccessToken(foundUser);
    res.cookie("accessToken", accessToken);

    res.status(200).json({ success: true, data: "assigned new cookie" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, e });
  }
};

module.exports = refreshAccessToken;
