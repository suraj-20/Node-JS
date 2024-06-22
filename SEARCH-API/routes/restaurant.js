const express = require("express");
const Restaurant = require("../models/restaurant");

const router = express.Router();

router.post("/addRestaurant", async (req, res) => {
  const { name, location, cost } = req.body;

  const result = await Restaurant.create({
    name,
    location,
    cost,
    user: req.user._id,
  });

  res.json({ msg: "Restaurant added Successfully", result });
});

module.exports = router;
