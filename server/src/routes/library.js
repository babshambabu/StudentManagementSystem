
const express = require('express');
const Library = require('../models/Library');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();

 const { getBooks,getBookIssues, addLibraryRecord, LibraryBooks,OverdueRecords, UpdateStatus } = require('../controllers/libraryController');

router.get('/books', verifyRole(['admin', 'librarian']), getBooks);
router.get('/history', verifyRole(['admin', 'librarian']), getBookIssues);
router.post('/addrecord', verifyRole(['admin', 'librarian']), addLibraryRecord);
router.post('/libraryBooks', verifyRole(['admin', 'librarian']),LibraryBooks);
router.get('/overdue', verifyRole(['Admin', 'Librarian']), OverdueRecords);

// Update borrowing record and write review
router.put('/:id/update', verifyRole(['admin', 'librarian']), UpdateStatus);

module.exports = router;
