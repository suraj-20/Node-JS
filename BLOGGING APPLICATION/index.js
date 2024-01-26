const path = require("path");
const express = require("express");
const { connectMongoDb } = require("./config/mongoDb");

const userRoute = require("./routes/user");

const app = express();
const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
