const express = require("express");
const { connectMongoDb } = require("./config/mongoDb");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const server = express();
const port = 8001;

const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

server.set("view engine", "ejs");
server.set("views", path.resolve("./Views"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(checkForAuthentication);

server.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoutes);
server.use("/", staticRoute);
server.use("/user", userRoute);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
