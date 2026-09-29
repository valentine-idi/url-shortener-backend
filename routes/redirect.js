const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

router.get("/:shortCode", async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const link = await Link.findOne({ shortCode });

    if (!link) return res.status(400).json({ message: "Invalid Link" });
    res.redirect(link.originalUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
