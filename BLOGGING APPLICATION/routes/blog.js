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
    user: req.user,
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

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  console.log("blog", blog);
  return res.render("blog", {
    user: req.user,
    blog,
  });
});

router.delete("/:id", async (req, res) => {
  const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

  return res.json({ msg: "blog deleted", deletedBlog });
});

module.exports = router;
