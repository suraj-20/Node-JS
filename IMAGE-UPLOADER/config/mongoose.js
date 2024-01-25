const mongoose = require("mongoose");

module.exports.connectMongoDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Error in mongoDb", error);
  }
};
