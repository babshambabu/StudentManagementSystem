const express = require('express');
const Fees = require('../models/Fees');
const verifyRole = require('../middleware/verifyRole');

const router = express.Router();

// Get all fees
router.get('/', verifyRole(['Admin', 'Staff']), async (req, res) => {
  const fees = await Fees.find();
  res.json(fees);
});

// Create a new fee record
router.post('/', verifyRole(['Admin', 'Staff']), async (req, res) => {
  const newFee = new Fees(req.body);
  await newFee.save();
  res.status(201).json(newFee);
});

// Update fee record
router.put('/:id', verifyRole(['Admin', 'Staff']), async (req, res) => {
  const fee = await Fees.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(fee);
});

// Delete fee record
router.delete('/:id', verifyRole(['Admin']), async (req, res) => {
  await Fees.findByIdAndDelete(req.params.id);
  res.json({ message: 'Fee record deleted' });
});


// Get students with unpaid fees
router.get('/unpaid', verifyRole(['Admin', 'Staff']), async (req, res) => {
    try {
      const unpaidFees = await Fees.find({ status: 'unpaid' })
        .populate('student', 'name');
  
      res.json(unpaidFees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching unpaid fees' });
    }
  });

module.exports = router;
