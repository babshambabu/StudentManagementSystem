import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title,
      author,
    };

    try {
     await axiosInstance.post('/library/books', newBook);
      toast.success("Book added successfully!");

      // Reset the form fields on success
      setTitle('');
      setAuthor('');
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the book.");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 ">
      <h2 className="text-xl font-bold mb-4">Add New Book</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Book
      </button>
    </form>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default AddBookForm;
