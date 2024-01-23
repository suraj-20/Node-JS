const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized User");

    return next();
  };
}

// function restrictToLogginedUserOnly(req, res, next) {
//   const userUid = req.headers["authorization"];
//   // console.log(req.headers);
//   if (!userUid) return res.redirect("/login");

//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// function authCheck(req, res, next) {
//   const userUid = req.headers["authorization"];
//   // console.log(req.headers);

//   const token = userUid.split("Bearer ")[1];
//   // console.log(token);
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo
};
