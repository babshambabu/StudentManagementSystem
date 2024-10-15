const mongoose = require('mongoose');

const FeesSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',  // Reference to the Student model
    required: true
  },
  amountDue: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  }
});

module.exports = mongoose.model('Fees', FeesSchema);
