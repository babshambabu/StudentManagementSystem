import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddOrEditBookIssueForm = ({ existingBookIssue = null, onClose }) => {
  const [studentId, setStudentId] = useState('');
  const [bookId, setBookId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [status, setStatus] = useState('borrowed');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (existingBookIssue) {
      // Populate the form fields if we're in edit mode
      setStudentId(existingBookIssue.studentId);
      setBookId(existingBookIssue.bookId);
      setIssueDate(existingBookIssue.issueDate.substring(0, 10)); // Format date for input
      setReturnDate(existingBookIssue.returnDate ? existingBookIssue.returnDate.substring(0, 10) : '');
      setStatus(existingBookIssue.status);
      setIsEditMode(true);
    }
  }, [existingBookIssue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookIssueData = {
      studentId,
      bookId,
      issueDate,
      returnDate,
      status,
    };

    try {
      if (isEditMode) {
        // Edit mode: PUT request
        await axiosInstance.put(`/library/book-issues/${existingBookIssue._id}`, bookIssueData);
        toast.success('Book issue updated successfully!');
      } else {
        // Add mode: POST request
        await axiosInstance.post('/library/book-issues', bookIssueData);
        toast.success('Book issue added successfully!');
      }

      // Reset the form fields after successful submission
      setStudentId('');
      setBookId('');
      setIssueDate('');
      setReturnDate('');
      setStatus('borrowed');
      setIsEditMode(false);

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while saving the book issue.');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? 'Edit Book Issue' : 'Add Book Issue'}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bookId">Book ID</label>
          <input
            type="text"
            id="bookId"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="issueDate">Issue Date</label>
          <input
            type="date"
            id="issueDate"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="returnDate">Return Date</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="borrowed">Borrowed</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {isEditMode ? 'Update Book Issue' : 'Add Book Issue'}
        </button>
      </form>
    </>
  );
};

export default AddOrEditBookIssueForm;
