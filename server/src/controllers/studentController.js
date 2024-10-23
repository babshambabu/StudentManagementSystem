const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({}, 'name'); // Fetch only names
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};


exports.Students = async (req, res) => {
 
  try {

      const students = await Student.find();
            res.status(200).json(students);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching students' });
  }
}


exports.AddStudentDetails = async (req, res) => {
  try {
    const student =  new Student(req.body);
     await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving student', error: error.message });
  }
};

exports.EditStudent = async (req, res) => {
  try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedStudent);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.FetchStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json(student);
 };

 exports.DeleteStudent = async (req, res) => {
  console.log("in delete")
  await Student.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Student deleted' });
};
