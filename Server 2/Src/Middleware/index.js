const fs = require("fs");

module.exports.logReqRes = (filename) => {
  const d = Date.now();
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${d.toString()}: ${req.ip}: ${req.path}`,
      (err, data) => {
        console.log("Error in Middleware", err);
        next();
      }
    );
  };
};
