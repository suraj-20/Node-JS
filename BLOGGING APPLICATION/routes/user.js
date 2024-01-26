const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({
    fullName,
    email,
    password,
  });

  res.redirect("/user/signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = User.matchPassword(email, password);

  console.log("users", user);
  res.redirect("/");
});

module.exports = router;
