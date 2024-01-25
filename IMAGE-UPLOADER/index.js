const path = require("path");
const express = require("express");
const multer = require("multer");
const { connectMongoDb } = require("./config/mongoose");
const imageSchema = require("./models/imageSchema");
const fs = require("fs");

connectMongoDb("mongodb://127.0.0.1:27017/image-uploader");

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
app.use(express.json());

app.get("/", async (req, res) => {
  await imageSchema.find({}).then((data, err) => {
    if (err) {
      console.log(err);
    }
    return res.render("homepage", { items: data });
  });
});

app.post("/", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const body = req.body;

  const obj = new imageSchema({
    name: body.name,
    img: {
      data: fs.readFileSync(req.file.path),
      contentType: "image/png",
    },
  });

  await imageSchema.create(obj).then((err, items) => {
    if (err) {
      console.log(err);
    } else {
      items.save();
      return res.redirect("/");
    }
  });
});

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
