
const express = require('express');
const Library = require('../models/Library');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();

const { getBooks } = require('../controllers/bookController');
const { getBookIssues, addLibraryRecord, LibraryBooks } = require('../controllers/libraryController');

router.get('/books', getBooks);
router.get('/history', verifyRole(['admin', 'librarian']), getBookIssues);
router.post('/addrecord', verifyRole(['admin', 'librarian']), addLibraryRecord);
//router.get('/overduerecords', verifyRole(['Admin', 'Librarian']), overdueRecord);


router.post('/libraryBooks', verifyRole(['admin', 'librarian']),LibraryBooks)

// Update borrowing record
router.put('/:id', verifyRole(['Librarian']), async (req, res) => {
  const borrowing = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(borrowing);
});

// Delete borrowing record
router.delete('/:id', verifyRole(['Librarian']), async (req, res) => {
  await Library.findByIdAndDelete(req.params.id);
  res.json({ message: 'Borrowing deleted' });
});


router.get('/overdue', verifyRole(['Admin', 'Librarian']), async (req, res) => {
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
  });


module.exports = router;
