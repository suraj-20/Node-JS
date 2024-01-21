const shortid = require("shortid");
const URL = require("../models/url");

module.exports.handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "url is requried" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  // return res.json({ msg: "ShortId generated", id: shortID });
  return res.render("home", { id: shortID });
};

module.exports.handleRedirectToShortId = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  // res.status(200).json({ msg: "All Set", entry });
  res.redirect(entry.redirectURL);
};

module.exports.handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
