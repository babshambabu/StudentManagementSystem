import React from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from '../AdminDashboard';
import LibrarianDashboard from '../LibrarianDashboard';
import StaffDashboard from '../StaffDashboard';

const Dashboard = () => {
  const { role } = useSelector((state) => state.auth);

  return (
    <div className="p-8">
      {role === 'admin' && <AdminDashboard />}
      {role === 'librarian' && <LibrarianDashboard />}
      {role === 'staff' && <StaffDashboard />}
    </div>
  );
};

export default Dashboard;
