const express = require("express");
const router = express.Router();

router.get("/:url", (req, res) => {
  res.redirect("https://google.com");
});

module.exports = router;
