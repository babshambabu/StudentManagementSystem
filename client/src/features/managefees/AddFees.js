import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, addFee } from '../../actions/feesActions';
import { useNavigate } from 'react-router-dom';
const AddFeeForm = () => {
  const [studentId, setStudentId] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('unpaid');
  const [term, setTerm] = useState('First Term');

  const dispatch = useDispatch();
  const students = useSelector(state => state.fees.students);
const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feeData = { studentId, amountDue, dueDate, status, term };
    dispatch(addFee(feeData));
    window.location.href = "/app/feehistory"
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Fee</h2>
      <form onSubmit={handleSubmit} className='text-left '>
        <label className="block mb-2">Student Name</label>
        <select
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        >
          <option value="" disabled>Select a student</option>
          {students.map(student => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">Amount Due</label>
        <input
          type="number"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={amountDue}
          onChange={(e) => setAmountDue(e.target.value)}
          required
        />

        <label className="block mb-2">Due Date</label>
        <input
          type="date"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <label className="block mb-2">Term</label>
        <select
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        >
          <option value="First Term">First Term</option>
          <option value="Second Term">Second Term</option>
          <option value="Third Term">Third Term</option>
        </select>

        <label className="block mb-2">Status</label>
        <select
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Add Fee
        </button>
      </form>
    </div>
  );
};

export default AddFeeForm;
