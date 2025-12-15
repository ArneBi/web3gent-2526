const express = require("express");
const usersController = require("../controllers/users_controller");
const authMiddleware = require("../middlewares/auth_middleware");
const { registerValidator } = require("../validators/register_validator");
const router = express.Router();

const users = [
  {
    id: 1,
    fName: "David",
  },
  { id: 2, fName: "John" },
  { id: 3, fName: "Jane" },
];

/* GET users listing. */

// http://localhost:3000/users/

router.post("/login", usersController.login);
router.post("/", registerValidator, usersController.create);

router.use(authMiddleware);

router.get("/", usersController.getAll);

router.get("/verify", usersController.verify);

router.get("/logout", usersController.logout);

router.get("/info", (req, res) => {
  res.send("Info ");
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;

  const foundUser = users.find((u) => u.id === +userId);

  if (foundUser) {
    return res.json(foundUser);
  }

  res.sendStatus(404);
});

router.get("/:userId/messages/:messageId", (req, res) => {
  const { userId, messageId } = req.params;

  const foundUser = users.find((u) => u.id === +userId);

  if (foundUser) {
    return res.json(foundUser);
  }

  res.sendStatus(404);
});

module.exports = router;
