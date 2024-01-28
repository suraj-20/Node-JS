const path = require("path");
const express = require("express");
const { connectMongoDb } = require("./config/mongoDb");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
