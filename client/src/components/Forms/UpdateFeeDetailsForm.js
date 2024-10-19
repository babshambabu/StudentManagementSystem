import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateFeeDetailsForm = ({ studentId, existingFeeDetails = null, onClose }) => {
  const [amountDue, setAmountDue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('unpaid');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (existingFeeDetails) {
      setAmountDue(existingFeeDetails.amountDue);
      setDueDate(existingFeeDetails.dueDate.substring(0, 10)); // Format date for input
      setStatus(existingFeeDetails.status);
      setIsEditMode(true);
    }
  }, [existingFeeDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feeData = {
      studentID: studentId,
      amountDue,
      dueDate,
      status,
    };

    try {
      if (isEditMode) {
        // PUT request for editing fee details
        await axiosInstance.put(`/fees/${existingFeeDetails._id}`, feeData);
        toast.success('Fee details updated successfully!');
      } else {
        // POST request for adding new fee details
        await axiosInstance.post('/fees', feeData);
        toast.success('Fee details added successfully!');
      }

      // Reset fields after submission
      setAmountDue('');
      setDueDate('');
      setStatus('unpaid');
      setIsEditMode(false);

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating fee details.');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Fee Details' : 'Add Fee Details'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amountDue">Amount Due</label>
          <input
            type="number"
            id="amountDue"
            value={amountDue}
            onChange={(e) => setAmountDue(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
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
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {isEditMode ? 'Update Fee Details' : 'Add Fee Details'}
        </button>
      </form>
    </>
  );
};

export default UpdateFeeDetailsForm;
