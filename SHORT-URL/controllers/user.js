const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

module.exports.handleUserSignup = async (req, res) => {
  const body = req.body;

  const user = new User({
    userName: body.userName,
    email: body.email,
    password: body.password,
  });

  const result = await User.create(user);

  if (result) {
    return res.redirect("login");
    // return res.status(201).json({ msg: "user created successfully", result });
  } else {
    return res.status(400).json({ msg: "User not created" });
  }
};

module.exports.handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
    password,
  });

  if (!user)
    return res.render("login", {
      error: "Invalid username or password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
};

module.exports.handleUserDelete = async (req, res) => {
  const userId = await User.findByIdAndDelete(req.params.id);

  return res.json({ msg: "User Deleted Successfully", userId });
};
