import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibrarianDashboard = () => {
  const [overdueBooks, setOverdueBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/library?overdue=true').then((res) => {
      setOverdueBooks(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Librarian Dashboard</h1>
      <h2 className="text-xl mb-2">Students with Overdue Books</h2>
      {overdueBooks.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Student Name</th>
              <th className="py-2 px-4">Book Name</th>
              <th className="py-2 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {overdueBooks.map((record) => (
              <tr key={record._id}>
                <td className="border px-4 py-2">{record.studentName}</td>
                <td className="border px-4 py-2">{record.bookName}</td>
                <td className="border px-4 py-2">{new Date(record.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No overdue books.</p>
      )}
    </div>
  );
};

export default LibrarianDashboard;
