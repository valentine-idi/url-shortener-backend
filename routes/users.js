const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, userValidation } = require("../models/User");
const asyncHandler = require("../middlewares/asyncHandler");

router.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { error } = userValidation(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });

    await newUser.save();

    res.send({
      id: newUser._id,
      name,
      email,
    });
  }),
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: "Invalid Email or Password" });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "Invalid Email or Password" });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Email or Password" });

    const token = user.generateToken();

    res.json({
      email: req.body.email,
      token,
    });
  }),
);

module.exports = router;
