const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Blog = require("../models/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  res.render("addBlog", {
    user: res.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });

  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
