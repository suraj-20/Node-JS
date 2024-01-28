const JWT = require("jsonwebtoken");

const SECRETKEY = "THISISMYSECRETKEY";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileURL: user.profileURL,
    role: user.role,
  };

  const token = JWT.sign(payload, SECRETKEY);
  return token;
}

function validateToken(token) {
  if (!token) return null;

  try {
    return JWT.verify(token, SECRETKEY);
  } catch (error) {
    return null;
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
