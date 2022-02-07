const User = require("../Entities/User");

const profile = async (req, res) => {
  try {
    const { user } = res.locals;

    const result = await User.find({
      email: user.email,
    })
      .select("-password")
      .populate("posts");

    res.status(200).json({ success: true, result });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

const profileById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundUser = await User.findById(id)
      .select("-password")
      .populate("posts");

    if (!foundUser)
      return res.status(200).json({ success: false, error: "user not found" });

    res.status(200).json({ success: true, result: foundUser });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
};

module.exports = { profile, profileById };
