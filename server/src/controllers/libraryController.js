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

exports.OverdueRecords = async (req, res) => {
  try {
    const currentDate = new Date();

    // Fetch all books that are overdue
    const overdueBooks = await BookIssue.find({ returnDate: { $lt: currentDate }, status: 'borrowed' })
      .populate('student', 'name')
      .populate('book', 'name');

    res.json(overdueBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overdue books' });
  }
}
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
 
    exports.UpdateStatus = async (req, res) => {
      const { review } = req.body;
    
      try {
        const record = await BookIssue.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Record not found' });
    
        record.status = 'returned';
        record.review = review|| ''; // Save review  if provided
        await record.save();
    
        res.json(record);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  
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
  
  exports.getBooks = async (req, res) => {
    try {
      const books = await Book.find({}, 'title'); // Fetch only titles
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books', error });
    }
  };