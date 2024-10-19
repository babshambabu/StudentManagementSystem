import React, { useState } from 'react';
import StudentsForm from '../components/Forms/StudentForm';
import { Link } from 'react-router-dom';
import LibraryApp  from '../pages/Library/LibraryApp';
import FeeApp from './Fees/FeeApp';
const StudentsPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const handleOpenModal = () => {
        setModalOpen(true);
        setSelectedStudentId(null); // Reset to add a new student
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFormSave = (studentData) => {
        console.log('Student saved:', studentData);
        setModalOpen(false); // Close the modal after saving
    };

    return (
        <div className="p-6">
            <LibraryApp/>
            <FeeApp/>
            <div className='text-center mt-4'> <Link to="/students"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">View Students</span></Link></div>                 
            <button
                onClick={handleOpenModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
                Add New Student
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">
                            {selectedStudentId ? 'Edit Student' : 'Add New Student'}
                        </h2>
                        <StudentsForm studentId={selectedStudentId} onSave={handleFormSave} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsPage;
