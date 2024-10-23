import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axiosInstance from "../../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function EditStudent({ studentId }) {

  const dispatch = useDispatch();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    class: "",
    division: "",
    studentId: "",
    age: "",
    address: "",
  });

  useEffect(() => {
    if (studentId) {
      // Fetch student data if editing
      axiosInstance
        .get(`/students/${studentId}`)
        .then((response) => setFormData(response.data))
        .catch((error) => {
          console.error(error);
          toast.error("Error fetching student data!");
        });
    }
  }, [studentId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (studentId) {
        // Edit existing student
        const response = await axiosInstance.put(
          `/students/edit/${studentId}`,
          formData
        );
        toast.success("Student updated successfully!");
        navigate('/app/students');
        // onSave(response.data);
      } 
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the student.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="text-left w-1/2 mx-auto">
        <div className="flex flex-col ">
          <label className="text-sm font-semibold mb-1 mt-3">Name</label>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 mt-3">Class</label>
          <input
            name="class"
            placeholder="Class"
            value={formData.class}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 mt-3">Division</label>
          <input
            name="division"
            placeholder="Division"
            value={formData.division}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 mt-3">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 mt-3">Student ID</label>
          <input
            name="studentId"
            placeholder="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 mt-3">Age</label>
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1 mt-3">Address</label>
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 mt-5"
        >
          {studentId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

    </>
  );
}

export default EditStudent;
