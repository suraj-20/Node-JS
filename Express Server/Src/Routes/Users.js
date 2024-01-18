const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserByID,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../Controllers/Users");
const router = express.Router();

// router.get("/users", async (req, res) => {
//   const users = await user.find();
//   const html = `
//         <ul>
//         {
//           ${users.map((user) => `<li>${user.firstName}</li>`).join("")}
//         }
//         </ul>
//       `;
//   return res.send(html);
// });

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
