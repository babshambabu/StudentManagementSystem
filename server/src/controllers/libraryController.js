// controllers/bookIssueController.js
const BookIssue = require('../models/BookIssue');
const Student = require('../models/Student');
const Book = require('../models/Book');

exports.getBookIssues = async (req, res) => {
  try {
    const bookIssues = await BookIssue.find().populate('studentId', 'name').populate('bookId', 'title');
    res.json(bookIssues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book issues', error });
  }
};


exports.addLibraryRecord = async (req, res) => {
    const { studentId, bookId, issueDate, returnDate, status } = req.body;
  
    try {
      const newRecord = new BookIssue({
        studentId,
        bookId,
        issueDate,
        returnDate,
        status,
      });
  console.log(newRecord)
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error adding library record', error });
    }
  };

  
  exports.overdueRecord = async (req, res) => {
    const { studentId, bookId, issueDate, returnDate, status } = req.body;
  
    try {
      const newRecord = new BookIssue({
        studentId,
        bookId,
        issueDate,
        returnDate,
        status,
      });
  console.log(newRecord)
      const savedRecord = await newRecord.save();
      res.status(201).json(savedRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching Overdue record', error });
    }
  };
  exports.LibraryBooks = async (req, res) => {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
    });
  
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };