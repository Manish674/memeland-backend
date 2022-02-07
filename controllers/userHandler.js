const User = require("../Entities/User");
// const Post = require('../Entities/Post')

const profile = async (req, res) => {
  try {
    const { user } = res.locals;
    const result = await User.find({
      email: user.email,
    }).select("-password").select('-_id')

    res.status(200).json({ success: true, result });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

const profileById = async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "its the one for whom you searched for" });
};

module.exports = { profile, profileById };
