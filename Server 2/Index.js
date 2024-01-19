// Step 1: import express.
const express = require("express");
const userRoutes = require("./Src/Routes/User");
const { connectMongoDb } = require("./Config/MongoDB");
const { logReqRes } = require("./Src/Middleware/index")
const bodyParser = require("body-parser");

// Step 2: Create server and port.
const server = express();
const port = 4000;

server.use(bodyParser.json());
server.use(express.urlencoded({ extended: false }));

// Middleware.
server.use(logReqRes("log.txt"));

// Connect Database.
connectMongoDb("mongodb://127.0.0.1:27017/user-credential")

// Routes.
server.use("/api/users", userRoutes);

// Step 3: Create default response.
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
