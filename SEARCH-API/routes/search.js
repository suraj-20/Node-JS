const express = require("express");
// const restaurants = [
//     { id:1, name: "Restaurant A", location: "City 1"},
//     { id:1, name: "Restaurant B", location: "City 2"},
// ];
const Restaurants = require("../models/search");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  return res.render("home");
});

router.post("/addRestaurantList", async (req, res) => {
  const { name, location, cuisine, costForTwo } = req.body;

  const restaurant = await Restaurants.create({
    name,
    location,
    cuisine,
    costForTwo,
  });

  console.log(restaurant);
  return res
    .status(200)
    .json({ msg: "Restaurant Added Successfully.", restaurant });
});

router.get("/api/restaurants/search", async (req, res) => {
  const location = req.query.location;
  const name = req.query.name;
  try {
    const filteredRestaurants = await Restaurants.find({
      name: { $regex: new RegExp(name, "i") },
      location: { $regex: new RegExp(location, "i") },
    });

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;
    const totalPages = Math.ceil(filteredRestaurants.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    console.log(totalPages);

    const resultRestaurant = filteredRestaurants.slice(startIndex, endIndex);
    res.render("restaurant", {
      restaurant: resultRestaurant,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Error retrieving restaurats frpm mongodb", error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/filter", async (req, res) => {
  const { cuisine, maxCost, sortOrder } = req.query;

  // Build the filter object based on user input
  const filter = {};
  if (cuisine) filter.cuisine = cuisine;
  if (maxCost) filter.costForTwo = { $lte: parseInt(maxCost) };

  // Retrieve and sort restaurants from the database
  let restaurants;
  if (sortOrder === "lowToHigh") {
    restaurants = await Restaurants.find(filter).sort({ costForTwo: 1 });
  } else if (sortOrder === "highToLow") {
    restaurants = await Restaurants.find(filter).sort({ costForTwo: -1 });
  } else {
    restaurants = await Restaurants.find(filter);
  }

  res.render("index", { restaurants });
});

module.exports = router;
