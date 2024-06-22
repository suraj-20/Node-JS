// MenuItem model
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  // other fields
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
});

const MenuItem = mongoose.model('MenuItemExample', menuItemSchema);

module.exports = MenuItem;
