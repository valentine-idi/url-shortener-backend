const express = require("express");
const router = express.Router();
const generateShortCode = require("../utils/generateShortCode");

router.get("/", (req, res) => {
  res.send("Testing");
});

router.post("/", (req, res) => {});

module.exports = router;
