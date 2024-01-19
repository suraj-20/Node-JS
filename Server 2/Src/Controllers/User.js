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

module.exports.handleGetAllUsers = async (req, res) => {
  const getAllUsers = await user.find({});

  return res.status(200).json({ msg: "Get All Users", getAllUsers });
};

module.exports.handleGetUserById = async (req, res) => {
  const getUserById = await user.findById(req.params.id);

  return res.status(200).json({ msg: "Get User By Id.", getUserById });
};

module.exports.handleDeleteUserById = async(req, res) => {
  const deleteUserById = await user.findByIdAndDelete(req.params.id);

  return res.json({ msg: "User deleted.", deleteUserById });
}