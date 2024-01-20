const mongoose = require("mongoose");

module.exports.connectMongoDb = async (url) => {
  try {
    const client = await mongoose.connect(url);
    console.log("MongoDb is connected");
  } catch (err) {
    console.log("Error occur in mongodb.", err);
  }
};
