const express = require("express");
const router = express.Router();
const { User, userValidation } = require("../models/User");
const asyncHandler = require("../middlewares/async");

router.post(
  "/register",
  asyncHandler(async (req, res) => {
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

module.exports = router;
