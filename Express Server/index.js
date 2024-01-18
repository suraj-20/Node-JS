const express = require("express");
const PORT = 3000;
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/userdb")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB error :", err);
  });

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello From middleware 1");
  next();
});

app.use((req, res, next) => {
  const d = Date.now();
  fs.appendFile(
    "log.txt",
    `\n${req.d}: ${req.ip}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users",async (req, res) => {
  const users = await user.find()
  const html = `
      <ul>
      {
        ${users.map((user) => `<li>${user.firstName}</li>`).join("")}
      }
      </ul>
    `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const getAllUsers = await user.find({});
  return res.json(getAllUsers);
});

app.get("/api/users/:id", async (req, res) => {
  const getById = await user.findById(req.params.id);

  return res.status(200).json({ stauts: "Succeess", getById });
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  // console.log("body: ", body);
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.gender ||
    !body.email ||
    !body.jobTitle
  ) {
    res.status(400).json("All fields are required..");
  }

  const result = await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res.status(201).json({ status: "success", result });
});

app.patch("/api/users/:id", async (req, res) => {
  const updateUserByID = await user.findByIdAndUpdate(req.params.id, {
    lastName: "Kumar",
  });
  return res.json({ status: "success", updateUserByID });
});

app.delete("/api/users/:id", async (req, res) => {
  const deletedUserByID = await user.findByIdAndDelete(req.params.id);

  return res.json({ status: "success", deletedUserByID });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
