const express = require("express");
const PORT = 3000;
const app = express();
const fs = require("fs");
const users = require("../PROJECT-01/MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
      <ul>
      {
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      }
      </ul>
    `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userID = users.find((user) => user.id === id);

  return res.json(userID);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log("body: ", body);
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile(
    "../PROJECT-01/MOCK_DATA.json",
    JSON.stringify(users),
    (err, data) => {
      return res.json({ status: "success", id: users.length });
    }
  );
});

app.patch("/api/users/:id", (req, res) => {
  const body = req.body;
  const id = Number(req.params.id);
  const userID = users.findIndex((user) => user.id === id);

  const getUser = users[userID];
  const updated_User = { ...getUser, ...body };

  users[userID] = updated_User;

  fs.writeFile(
    "../PROJECT-01/MOCK_DATA.json",
    JSON.stringify(users),
    (err, data) => {
      return res.json({ status: "success", updated_User });
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userID = users.findIndex((user) => user.id === id);
  console.log("userID: ", userID);
  const deleted_user = users.splice(userID, 1)[0];
  console.log("deleted_user :" ,deleted_user)

  fs.writeFile("../PROJECT-01/MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", deleted_user });
  })
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
