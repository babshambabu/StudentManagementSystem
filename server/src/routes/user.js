const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure you have the User model created in the models folder
const verifyToken = require('../middleware/verifyToken'); // Optional: Middleware for protected routes

const router = express.Router();


router.get('/', async (req, res) => {
  const { role } = req.query; // Extract role from query parameter

  try {
    // Find users by role
    const users = await User.find({ role });

    // If no users found, return a 404
    if (!users.length) {
      return res.status(404).json({ message: 'No users found with the specified role' });
    }

    // Return the found users
    res.json(users);
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// Register a new user
router.post('/register', async (req, res) => {
  const { name, username, password, email, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      username,
      password: hashedPassword,
      email,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Get user info (protected route)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

module.exports = router;
