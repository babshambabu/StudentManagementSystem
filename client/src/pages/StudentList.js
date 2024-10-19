// src/components/StudentList.js
import React, { useState, useEffect } from 'react';
import axiosInstance from "../Instance/Axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch all students
        axiosInstance.get('/students/students')
            .then((response) => {
                setStudents(response.data);
                toast.success("Students fetched successfully!"); // Success message
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch students. Please try again."); // Error message
            });
    }, []);

    return (
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">All Students</h2>
        <ToastContainer /> {/* Toast container to display messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
                <div key={student._id} className="bg-white p-4 rounded shadow">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Class:</strong> {student.class}</p>
                    <p><strong>Division:</strong> {student.division}</p>
                    <p><strong>Age:</strong> {student.age}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default StudentList;
