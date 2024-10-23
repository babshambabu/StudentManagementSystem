const express = require('express');
const verifyToken = require('../middleware/verifyToken'); 
const router = express.Router();
const { Login, UserDetails } = require('../controllers/authController');

// Login Route 
router.post('/login', Login);

// Get User Details Route
router.get('/user', verifyToken, UserDetails);

module.exports = router;
