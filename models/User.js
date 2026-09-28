const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 255,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 255,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email`,
      },
    },

    password: {
      type: String,
      required: true,
      min: 5,
      max: 255,
      trim: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
