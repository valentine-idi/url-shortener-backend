const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

function userValidation(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).trim().required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    password: Joi.string().min(5).max(255).trim().required(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.userValidation = userValidation;
