const user = require("../Models/User");

module.exports.register = async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.password 
  ) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  const users = new user({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

//   return res.status(201).json({ msg: "User added successfully", users });
  const result = await user.create(users);

  if (result) {
    return res.status(201).json({ msg: "User added successfully.", result });
  } else {
    return res.status(400).json({ msg: "User not added" });
  }
};
