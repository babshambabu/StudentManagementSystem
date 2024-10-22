// components/AddUser.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../actions/userActions';
import axiosInstance from '../../utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const AddUser = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'Staff',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/addUser", formData);
      dispatch(addUser(formData));

      toast.success('User added successfully!');

        setFormData({ name: '', username: '', email: '', password: '', role: 'Staff' });
    } catch (error) {
     
      toast.error('Failed to add user. Please try again.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleAddUser} className="w-1/2 mx-auto">
        <div className="flex flex-col space-y-4"> {/* Changed to flex-col and space-y for vertical stacking */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
            <option value="Librarian">Librarian</option>
          </select>
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add User</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddUser;
