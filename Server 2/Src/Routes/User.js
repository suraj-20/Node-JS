const express = require("express");
const controller = require("../Controllers/User")
const router = express.Router();

router.post("/register", controller.register);

module.exports = router;