const jwt = require("jsonwebtoken");
const secretKey = "THISISMYSECRETKEY";
// const sessionIdToUserMap = new Map();

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey
  );
  // sessionIdToUserMap.set(id, user);
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
  // return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
