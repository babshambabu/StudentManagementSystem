const mongoose = require('mongoose');

const LibrarySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',  // Reference to the Student model
    required: true
  },
  bookName: {
    type: String,
    required: true
  },
  borrowDate: {
    type: Date,
    default: Date.now
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned'],
    default: 'borrowed'
  }
}
,{
  timestamps: true
});

module.exports = mongoose.model('Library', LibrarySchema);
