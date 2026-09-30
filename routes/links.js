const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const generateShortCode = require("../utils/generateShortCode");
const isValidUrl = require("../utils/isValidUrl");
const asyncHandler = require("../middlewares/asyncHandler");
const { optionalAuth, requireAuth } = require("../middlewares/auth");

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const links = await Link.find({ user: userId }).select(
      "_id shortCode originalUrl user",
    );

    res.json(links);
  }),
);

router.post(
  "/",
  optionalAuth,
  asyncHandler(async (req, res) => {
    const user = req.user;
    const { link } = req.body;
    const isUrlValid = isValidUrl(link);

    if (!isUrlValid)
      return res.status(400).json({ message: "Please enter a valid url" });

    const shortCode = generateShortCode();

    const newLink = new Link({
      shortCode,
      originalUrl: link,
      user: req.user?.id,
    });

    await newLink.save();

    res.json({
      shortCode,
      originalUrl: link,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      user: req.user?.id || undefined,
    });
  }),
);

module.exports = router;
