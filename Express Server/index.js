const express = require("express");
const { connectMongoDb } = require("./Config/MongoDb");
const { logReqRes } = require("./Src/Middleware/index");
const userRoutes = require("./Src/Routes/Users");
const app = express();
const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/userdb")
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log("MongoDb error", err);
  });

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
