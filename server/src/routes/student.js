const express = require('express');
const Student = require('../models/Student');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();


const { getStudents } = require('../controllers/studentController');

router.get('/studentnames', getStudents);

router.get('/students', async (req, res) => {
  try {

      const students = await Student.find();
            res.status(200).json(students);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching students' });
  }
});



router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving student', error: error.message });
  }
});


 // Create a new student
// router.post('/', verifyRole(['Admin']), async (req, res) => {
//   const newStudent = new Student(req.body);
//   await newStudent.save();
//   res.status(201).json(newStudent);
// });

// Edit student
router.put('/edit/:id',  async (req, res) => {
  try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedStudent);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Edit a student
 router.get('/:id', verifyRole(['admin']), async (req, res) => {
  console.log("in get std")
   const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json(student);
 });


// Delete a student
router.delete('/delete/:id', verifyRole(['admin']), async (req, res) => {
  console.log("in delete")
  await Student.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Student deleted' });
});

module.exports = router;