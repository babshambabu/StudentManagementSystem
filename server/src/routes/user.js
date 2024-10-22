const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); //
const verifyToken = require('../middleware/verifyToken'); 
const { addUser, getUsers } = require('../controllers/userController');
const router = express.Router();


router.post('/addUser', addUser);

 router.get('/', getUsers);   // Route to get all users
router.get('/users', getUsers);   // Route to get all users

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


// // Add user
// router.post('/users', async (req, res) => {
//   try {
//     const { name, username, password, email, role } = req.body;
//     const newUser = new User({ name, username, password, email, role });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// });

// Update password
router.put('/users/:id/password', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    user.password = password;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating password' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});




module.exports = router;
