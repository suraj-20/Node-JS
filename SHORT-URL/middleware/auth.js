const { getUser } = require("../service/auth");

module.exports.restrictToLogginedUserOnly = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
};

module.exports.authCheck = async (req, res, next) => {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
};
