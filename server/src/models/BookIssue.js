// models/BookIssue.js
const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned'],
    required: true,
    default: 'borrowed',
  },
});

module.exports = mongoose.model('BookIssue', bookIssueSchema);
