const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cuisine: {
      type: Array,
    },
    costForTwo: {
      type: Number,
    },
  },
  { timestamps: true }
);

const restaurants = mongoose.model("searches", searchSchema);

module.exports = restaurants;
