const mongoose = require("mongoose");

module.exports.connectMongoDb = async (url) => {
  try {
    const client = await mongoose.connect(url);
    console.log("DB is connected");
  } catch (err) {
    console.log("Error in DB", err);
  }
};
