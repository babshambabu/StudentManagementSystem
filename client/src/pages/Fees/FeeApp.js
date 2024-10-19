import React, { useState } from 'react';
import UpdateFeeDetailsForm from '../../components/Forms/UpdateFeeDetailsForm';

const FeeApp= () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentId, setStudentId] = useState(''); // Replace with the selected student's ID
  const [feeDetails, setFeeDetails] = useState(null); // Existing fee details (if editing)

  const openModal = (id, details) => {
    setStudentId(id);
    setFeeDetails(details);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFeeDetails(null);
  };

  return (
    <div>
      <button
        onClick={() => openModal('studentId123', null)} // Replace 'studentId123' with actual student ID
        className="text-blue-500 underline"
      >
        Update Fee Details
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <UpdateFeeDetailsForm studentId={studentId} existingFeeDetails={feeDetails} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeApp;
