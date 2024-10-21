import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFees } from '../../actions/feesActions'; 
import Modal from 'react-modal'; 
import axiosInstance from '../../utils/axiosInstance';

const UnpaidFeesList = () => {
  const dispatch = useDispatch();
  const fees = useSelector(state => state.fees.fees);
  const loading = useSelector(state => state.fees.loading);

  
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(getFees());
  }, [dispatch]);

  const handleStudentClick = async (studentId) => {
    try {
      const response = await axiosInstance.get(`/students/${studentId}`);
      setSelectedStudent(response.data);
      setIsStudentModalOpen(true);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const closeStudentModal = () => {
    setIsStudentModalOpen(false);
    setSelectedStudent(null);
  };

  if (loading) return <p>Loading...</p>;

  // Filter fees to only include unpaid ones
  const unpaidFees = fees.filter(fee => fee.status === 'unpaid');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Unpaid Fees List</h2>
      {unpaidFees.length === 0 ? (
        <p>No unpaid fees found.</p>
      ) : (
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Term</th>
              <th className="px-4 py-2">Amount Due</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
          {unpaidFees.map(fee => (
              <tr key={fee._id}>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleStudentClick(fee.student._id)}
                    className="text-blue-500 underline"
                  >
                    {fee.student.name}
                  </button>
                </td>
                <td className="border px-4 py-2">{fee.term}</td>
                <td className="border px-4 py-2">₹{fee.amountDue}</td>
                <td className="border px-4 py-2">{new Date(fee.dueDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{fee.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}

   
    {/* Modal for showing student details */}
    <Modal
        isOpen={isStudentModalOpen}
        onRequestClose={closeStudentModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        {selectedStudent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Admission Number:</strong> {selectedStudent.studentId}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Class:</strong> {selectedStudent.class} - {selectedStudent.division}</p>
            <p><strong>Age:</strong> {selectedStudent.age || 'N/A'}</p>
            <p><strong>Address:</strong> {selectedStudent.address || 'N/A'}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeStudentModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UnpaidFeesList;
