const express = require("express");
const User = require("../models/menu");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const result = await User.create({
    name,
    email,
    password,
  });

  res.json({ msg: "User Created successfully", result });
});

module.exports = router;
