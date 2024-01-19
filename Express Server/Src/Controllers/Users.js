const express = require("express");
const user = require("../Models/Users");

async function handleGetAllUsers(req, res) {
  const getAllUsers = await user.find({});
  return res.json(getAllUsers);
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  // console.log("body: ", body);
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.gender ||
    !body.email ||
    !body.jobTitle
  ) {
    res.status(400).json("All fields are required..");
  }

  const result = await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res.status(201).json({ status: "success", result });
}

async function handleGetUserByID(req, res) {
  const users = await user.findById(req.params.id);

  if(!users) return res.status(404).json("User not found");

  return res.status(200).json({ stauts: "Succeess", users });
}

async function handleUpdateUserById(req, res) {
  const updateUserByID = await user.findByIdAndUpdate(req.params.id, {
    email: "DivyaB@example.com",
  });
  return res.json({ status: "success", updateUserByID });
}

async function handleDeleteUserById(req, res) {
  const deletedUserByID = await user.findByIdAndDelete(req.params.id);
  return res.json({ status: "success", deletedUserByID });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserByID,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
