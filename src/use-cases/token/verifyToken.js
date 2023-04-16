//this token refers to jwt module 
const verifyToken = (token) => {
  return ({ tk }) => {
    return token.verify(tk, process.env.JWT_SECRET);
  }
}

module.exports = verifyToken;

