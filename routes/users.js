const express = require("express");
const router = express.Router();
const { User, userValidation } = require("../models/User");

router.post("/register", async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
