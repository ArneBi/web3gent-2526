const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  const student = {
    fName: "David",
    lName: "Breckx",
  };

  res.sendStatus(204);
  // res.json(student);
});

module.exports = router;
