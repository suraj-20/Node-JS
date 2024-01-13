const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

// Middleware - plugin (We can use body-parse.json() and express.json() in place of express.urlencoded)
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log("Midleware 1");
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

app.get("/api/users", (req, res) => {
  res.setHeader("X-myName", "Suraj");
  return res.status(200).json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id); // convert string into number using Number keyword.
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // console.log(user);

    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userBody = req.body;
    const userID = users.findIndex((user) => user.id === id);
    // console.log("userID :", userID);

    const getUser = users[userID];
    const updated_User = { ...getUser, ...userBody };

    users[userID] = updated_User;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.send({ status: "success", updated_User });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userID = users.findIndex((user) => user.id === id);
    console.log("userID :", userID);
    const del_User = users.splice(userID, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", del_User });
    });
  });

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
