const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

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
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);   // convert string into number using Number keyword.
    const user = users.find((user) => user.id === id);

    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });


app.post("/api/users", (req, res) => {
  return res.json({ status: "pending" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
