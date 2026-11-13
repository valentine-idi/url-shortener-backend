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

    const links = await Link.find({ userId }).select(
      "_id shortUrl shortCode originalUrl userId",
    );

    const newLinks = links.map((link) => ({
      id: link._id,
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
      userId: link.userId,
    }));

    res.json(newLinks);
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
      userId: req.user?.id,
    });

    await newLink.save();

    res.json({
      id: newLink._id,
      shortCode,
      originalUrl: link,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      userId: req.user?.id || undefined,
    });
  }),
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const link = await Link.findById(req.params.id);

    if (!link) return res.status(404).json({ message: "Link does not exist" });

    if (link.userId.toString() !== userId)
      return res.status(403).json({ message: "Cannot delete this link" });

    const result = await Link.findByIdAndDelete(req.params.id);

    res.status(200).json(result);
  }),
);

module.exports = router;
