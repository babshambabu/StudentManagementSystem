const Fees = require('../models/Fees');
const Student = require('../models/Student');

exports.getStudentsFeeList = async (req, res) => {
    try {
      const fees = await Fees.find().populate('student', 'name'); // Populate student name
      res.json(fees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  exports.updateFeeStatus =  async (req, res) => {
    const { remark } = req.body;
  
    try {
      const fee = await Fees.findById(req.params.id);
      if (!fee) return res.status(404).json({ message: 'Fee not found' });
  
      fee.status = 'paid';
      fee.remark = remark || ''; // Save remark if provided
      await fee.save();
  
      res.json(fee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



  exports.addFeeRecord = async (req, res) => {
    const { studentId, amountDue, dueDate, status, term } = req.body;
    
    try {
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      const newFee = new Fees({
        student: studentId,
        amountDue,
        dueDate,
        status,
        term
      });
  
      const savedFee = await newFee.save();
      res.status(201).json(savedFee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }