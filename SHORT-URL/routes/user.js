const express = require("express");
const { handleUserSignup, handleUserLogin, handleUserDelete } = require("../controllers/user");
const router = express.Router();

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.delete("/:id", handleUserDelete);

module.exports = router;