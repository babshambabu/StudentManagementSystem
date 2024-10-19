import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance.js'

import util from './CalendarView/util';
const AdminDashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [librarianCount, setLibrarianCount] = useState(0);
  const [adminCount, setadminCount] = useState(0);

  useEffect(() => {
    // Fetch total students
    axiosInstance.get('/students').then((res) => {
      setStudentCount(res.data.length);
    }).catch((err) => {
      console.error(err);
    });

    // Fetch total staff
    axiosInstance.get('/users?role=staff').then((res) => {
      setStaffCount(res.data.length);
    }).catch((err) => {
      console.error(err);
    });

    // Fetch total librarians
    axiosInstance.get('/users?role=librarian').then((res) => {
      setLibrarianCount(res.data.length);
    }).catch((err) => {
      console.error(err);
    });


      // Fetch total admin
      axiosInstance.get('/users?role=admin').then((res) => {
        setadminCount(res.data.length);
      }).catch((err) => {
        console.error(err);
      });
    }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl">Total Staff</h2>
          <p className="text-2xl font-bold">{staffCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl">Total Librarians</h2>
          <p className="text-2xl font-bold">{librarianCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl">Total Admins</h2>
          <p className="text-2xl font-bold">{adminCount}</p>
        </div>


        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl">Total Students</h2>
          <p className="text-2xl font-bold">{studentCount}</p>
        </div>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
