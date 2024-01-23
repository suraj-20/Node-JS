const { getUser } = require("../service/auth");

function restrictToLogginedUserOnly(req, res, next) {
  const userUid = req.headers["authorization"];
  // console.log(req.headers);
  if (!userUid) return res.redirect("/login");

  const token = userUid.split("Bearer ")[1];
  const user = getUser(token);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

function authCheck(req, res, next) {
  const userUid = req.headers["authorization"];
  // console.log(req.headers);

  const token = userUid.split("Bearer ")[1];
  // console.log(token);
  const user = getUser(token);

  req.user = user;
  next();
};

module.exports = {
  restrictToLogginedUserOnly,
  authCheck
};
