// controllers/bookController.js
const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({}, 'title'); // Fetch only titles
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};
