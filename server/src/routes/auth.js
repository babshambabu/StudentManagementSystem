// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken'); // Middleware to verify token

const router = express.Router();



// Login Route
router.post('/login', async (req, res) => {
  
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Register Route for Admin (Optional: Ensure only Admin can register users)
router.post('/register', verifyToken, async (req, res) => {
  const { name, username, password, email, role } = req.body;

  // Only Admin can create users
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, username, password: hashedPassword, email, role });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Get User Details Route
router.get('/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
