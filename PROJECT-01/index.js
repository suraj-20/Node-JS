const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/User-details")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Error", err);
  });

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("users", userSchema);

// Middleware - plugin (We can use body-parse.json() and express.json() in place of express.urlencoded)
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Midleware 1");
  next();
});

app.use((req, res, next) => {
  const d = Date.now();
  fs.appendFile(
    "log.txt",
    `\n${d.toString()}: ${req.ip}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
       <ul>
         ${users
           .map((user) => `<li>First Name: ${user.first_name}</li>`)
           .join("")}
       </ul>
    `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await user.find({});

  return res.status(200).json(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id); // convert string into number using Number keyword.
    // const user = users.find((user) => user.id === id);
    const users = await user.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ msg: "User not found" });
    }
    // console.log(user);
    return res.status(200).json({ msg: "Success", users });
  })
  .patch(async (req, res) => {
    // const id = Number(req.params.id);
    // const userBody = req.body;
    // const userID = users.findIndex((user) => user.id === id);
    // // console.log("userID :", userID);

    // const getUser = users[userID];
    // const updated_User = { ...getUser, ...userBody };

    // users[userID] = updated_User;

    const updated_User = await user.findByIdAndUpdate(req.params.id);

    // console.log("updated_user:", updated_User);

    return res.send({ status: "success", updated_User });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    // });
  })
  .delete(async (req, res) => {
    // const id = Number(req.params.id);
    // const userID = users.findIndex((user) => user.id === id);
    // console.log("userID :", userID);
    // const del_User = users.splice(userID, 1);

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: "success", del_User });
    // });

    const deleted_user = await user.findByIdAndDelete(req.params.id);

    // console.log(deleted_user);
    return res.json({ status: "success", deleted_user });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ msg: "All fields are required..." });
  }
  //   console.log("body", body);
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });

  const result = await user.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  console.log("result", result);

  res.status(201).json({ msg: "Success" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
