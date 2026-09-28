const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      min: 5,
      max: 5,
      unique: true,
      required: true,
      trim: true,
    },
    originalUrl: {
      type: String,
      min: 10,
      max: 1024,
      required: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
