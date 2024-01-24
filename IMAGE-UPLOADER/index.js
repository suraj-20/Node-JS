const path = require("path");
const express = require("express");
const multer = require("multer");
// const imageRoutes = require("./routes/images");

const app = express();
const port = 5000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, res, cb) {
    return cb(null, `${Date.now()}-${res.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.urlencoded({ extended: false }));

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
