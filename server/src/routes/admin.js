const express = require('express');
const Student = require('../models/Student');
const User = require('../models/User');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Route to get the dashboard data for the Admin
router.get('/dashboard', verifyRole(['Admin']), async (req, res) => {
  try {
    // Count the number of students
    const studentCount = await Student.countDocuments();

    // Count the number of staff
    const staffCount = await User.countDocuments({ role: 'Staff' });

    // Count the number of librarians
    const librarianCount = await User.countDocuments({ role: 'Librarian' });

    // Send the result back to the frontend
    res.json({ studentCount, staffCount, librarianCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

module.exports = router;
