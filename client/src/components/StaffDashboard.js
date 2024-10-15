import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffDashboard = () => {
  const [unpaidFees, setUnpaidFees] = useState([]);

  useEffect(() => {
    axios.get('/api/fees?status=unpaid').then((res) => {
      setUnpaidFees(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
      <h2 className="text-xl mb-2">Students with Unpaid Fees</h2>
      {unpaidFees.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Student Name</th>
              <th className="py-2 px-4">Amount Due</th>
              <th className="py-2 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {unpaidFees.map((fee) => (
              <tr key={fee._id}>
                <td className="border px-4 py-2">{fee.studentName}</td>
                <td className="border px-4 py-2">{fee.amountDue}</td>
                <td className="border px-4 py-2">{new Date(fee.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>All fees are paid.</p>
      )}
    </div>
  );
};

export default StaffDashboard;
