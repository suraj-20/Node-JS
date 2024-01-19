const express = require("express");
const controller = require("../Controllers/User")
const router = express.Router();

router.post("/register", controller.register);
router.get("/", controller.handleGetAllUsers)
router.get("/:id", controller.handleGetUserById);
router.delete("/:id", controller.handleDeleteUserById);

module.exports = router;