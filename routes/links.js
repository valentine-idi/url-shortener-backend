const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const generateShortCode = require("../utils/generateShortCode");
const isValidUrl = require("../utils/isValidUrl");

router.get("/", (req, res) => {
  res.send("Testing");
});

router.post("/", async (req, res) => {
  const user = req.user;
  const { link } = req.body;
  const isUrlValid = isValidUrl(link);

  if (!isUrlValid)
    return res.status(400).json({ message: "Please enter a valid url" });

  const shortCode = generateShortCode();

  try {
    const link = new Link({
      shortCode,
      originalUrl: link,
      user: req.user._id,
    });

    await link.save();

    res.json({
      shortCode,
      originalUrl: link,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      user: req.user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occured" });
  }
});

module.exports = router;
