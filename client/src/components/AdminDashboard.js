import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [librarianCount, setLibrarianCount] = useState(0);

  useEffect(() => {
    // Fetch total students
    axios.get('/api/students').then((res) => {
      setStudentCount(res.data.length);
    }).catch((err) => {
      console.error(err);
    });

    // Fetch total staff
    axios.get('/api/users?role=Staff').then((res) => {
      setStaffCount(res.data.length);
    }).catch((err) => {
      console.error(err);
    });

    // Fetch total librarians
    axios.get('/api/users?role=Librarian').then((res) => {
      setLibrarianCount(res.data.length);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl">Total Students</h2>
          <p className="text-2xl font-bold">{studentCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl">Total Staff</h2>
          <p className="text-2xl font-bold">{staffCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl">Total Librarians</h2>
          <p className="text-2xl font-bold">{librarianCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
