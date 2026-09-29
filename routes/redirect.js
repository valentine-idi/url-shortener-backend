const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const asyncHandler = require("../middlewares/asyncHandler");

router.get(
  "/:shortCode",
  asyncHandler(async (req, res) => {
    const shortCode = req.params.shortCode;

    const link = await Link.findOne({ shortCode });
    if (!link) return res.status(400).json({ message: "Invalid Link" });

    res.redirect(link.originalUrl);
  }),
);

module.exports = router;
