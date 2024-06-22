// Restaurant model
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  // other fields
});

const Restaurant = mongoose.model('restaurantExample', restaurantSchema);

module.exports = Restaurant;
