const fs = require("fs");

function logReqRes() {
  return (req, res, next) => {
    const d = Date.now();
    fs.appendFile(
      "log.txt",
      `\n${req.d}: ${req.ip}: ${req.path}`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = {
    logReqRes,
}