const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login function
exports.Login = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body
    
    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
    
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    
        // Generate token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, role: user.role });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// Get User Details function
exports.UserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
