const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  feesPaid: { type: Boolean, default: false },
  class: { type: String, required: true },
  division: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  age: { type: Number },
  address: { type: String }
});

module.exports = mongoose.model('Student', StudentSchema);
