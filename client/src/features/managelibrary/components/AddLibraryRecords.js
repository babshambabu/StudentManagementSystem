import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStudents, getBooks, addLibraryRecord } from '../../../actions/libraryActions';

const AddLibraryRecord = () => {
  const [studentId, setStudentId] = useState('');
  const [bookId, setBookId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [status, setStatus] = useState('borrowed');
  const studentsList = useSelector((state) => state.studentsList);
  const { students } = studentsList;
  const booksList = useSelector((state) => state.booksList);
  const { books } = booksList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getBooks());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLibraryRecord({ studentId, bookId, issueDate, returnDate, status }));
    
   navigate("/library")
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Library Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-gray-600 mb-2">Student</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value=''>Select a student</option>
            {students && students.map((student) => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Book</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          >
            <option value=''>Select a book</option>
            {books && books.map((book) => (
              <option key={book._id} value={book._id}>{book.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Issue Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Return Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Status</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="borrowed">Borrowed</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Add Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLibraryRecord;
