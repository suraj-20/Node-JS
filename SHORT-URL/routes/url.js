const express = require("express");
const controller = require("../controllers/url");
const router = express.Router();

router.post("/", controller.handleGenerateNewShortURL);

router.get("/:shortId", controller.handleRedirectToShortId);

router.get("/analytics/:shortId", controller.handleGetAnalytics);

module.exports = router;
