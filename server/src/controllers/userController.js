const User = require('../models/userModel');

exports.addUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;
  try {
    const newUser = new User({ name, username, email, password, role });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
