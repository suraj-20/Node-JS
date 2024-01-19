const fs = require("fs");

module.exports.logReqRes = () => {
  const d = Date.now();
  return (req, res, next) => {
    fs.appendFile(
      "log.txt",
      `\n${d.toString()}: ${req.ip}: ${req.path}`,
      (err, data) => {
        next();
      }
    );
  };
};
