const express = require('express');
const Student = require('../models/Student');
const verifyRole = require('../middleware/verifyRole');
const { getStudents ,Students,AddStudentDetails,EditStudent,FetchStudent,DeleteStudent} = require('../controllers/studentController');

const router = express.Router();

router.get('/studentnames',verifyRole(['admin','staff','Librarian']), getStudents);
router.get('/students',verifyRole(['admin','staff']),Students) ;
router.post('/add', verifyRole(['admin','staff']),AddStudentDetails) 
router.put('/edit/:id', verifyRole(['admin','staff']),EditStudent) 
router.get('/:id', verifyRole(['admin','staff','librarian']),FetchStudent) 
router.delete('/delete/:id', verifyRole(['admin','staff']),DeleteStudent) 
module.exports = router;