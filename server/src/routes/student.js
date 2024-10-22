const express = require('express');
const Student = require('../models/Student');
const verifyRole = require('../middleware/verifyRole');
const { getStudents ,AddStudentDetails,EditStudent,FetchStudent,DeleteStudent} = require('../controllers/studentController');

const router = express.Router();

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



router.post('/add', verifyRole(['admin','staff']),AddStudentDetails) 
router.put('/edit/:id', verifyRole(['admin','staff']),EditStudent) 

 
// Edit student
router.put('/edit/:id', verifyRole(['admin','staff']),EditStudent)  

// Fetch  a student
 router.get('/:id', verifyRole(['admin']),FetchStudent) 


// Delete a student
router.delete('/delete/:id', verifyRole(['admin']),DeleteStudent) 
module.exports = router;