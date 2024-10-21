const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({}, 'name'); // Fetch only names
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};