const path = require("path");
const express = require("express");
const { connectMongoDb } = require("./config/mongoDb");
const userRoute = require("./routes/user");
const restaurantRoute = require("./routes/restaurant");
const searchRoute = require("./routes/search");

// Import your models
const Restaurant = require("./models/restaurant");
const MenuItem = require("./models/menu");

const app = express();
const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/foodDeliveryApp");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use("/user", userRoute);
// app.use("/restaurant", restaurantRoute);
// app.use("/", searchRoute);

// Route to create a new restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const { name, location } = req.body;
    const restaurant = new Restaurant({ name, location });
    const savedRestaurant = await restaurant.save();
    res.json(savedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new menu item with a reference to a restaurant
app.post("/menu-items", async (req, res) => {
  try {
    const { name, description, price, restaurantId } = req.body;

    // Check if the provided restaurantId is valid
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const menuItem = new MenuItem({
      name,
      description,
      price,
      restaurant: restaurantId,
    });
    const savedMenuItem = await menuItem.save();
    res.json(savedMenuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
