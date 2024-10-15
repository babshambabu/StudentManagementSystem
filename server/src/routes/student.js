const express = require('express');
const Student = require('../models/Student');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Get all students
router.get('/', verifyRole(['Admin', 'Staff', 'Librarian']), async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Create a new student
router.post('/', verifyRole(['Admin']), async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
});

// Edit a student
router.put('/:id', verifyRole(['Admin']), async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

// Delete a student
router.delete('/:id', verifyRole(['Admin']), async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

module.exports = router;
