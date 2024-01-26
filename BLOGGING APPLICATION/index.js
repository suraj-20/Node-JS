const express = require("express");

const { connectMongoDb } = require("./config/mongoDb");

const app = express();
const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/")

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
