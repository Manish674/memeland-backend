const login = (req, res) => {
  console.log(req.body);
  res.status(200).json({success: true, data: "hello from login"})
}

const register = (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true, data: "hello from register" })
}

module.exports = { login, register };
