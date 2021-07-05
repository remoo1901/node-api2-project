const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Api",
  });
});

module.exports = router;
