const fs = require("fs");

function logReqRes(filename) {
  const d = Date.now();
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${d.toString()}: ${req.ip}: ${req.path}`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = {
    logReqRes,
}