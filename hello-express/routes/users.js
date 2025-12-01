const express = require("express");
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

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

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
