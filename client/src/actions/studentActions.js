// src/actions/studentActions.js

import axiosInstance from '../utils/axiosInstance';
import {
  FETCH_STUDENTS,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from './types';

// Fetch All Students
export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS });

  try {
    const res = await axiosInstance.get('/students/students');

    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: res.data // List of students
    });
  } catch (err) {
    dispatch({
      type: FETCH_STUDENTS_FAILURE,
      payload: err.response?.data?.message || 'Error fetching students'
    });
  }
};

// Add a new Student
export const addStudent = (studentData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/students', studentData);

    dispatch({
      type: ADD_STUDENT,
      payload: res.data // Newly created student
    });
  } catch (err) {
    console.error(err);
    // Optionally, dispatch a failure action
  }
};

// Update an existing Student
export const updateStudent = (id, studentData) => async (dispatch) => {
  try {
    const res = await axiosInstance.put(`/students/${id}`, studentData);

    dispatch({
      type: UPDATE_STUDENT,
      payload: res.data // Updated student details
    });
  } catch (err) {
    console.error(err);
    // Optionally, dispatch a failure action
  }
};

// Delete a Student
export const deleteStudent = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/students/delete/${id}`);

    dispatch({
      type: DELETE_STUDENT,
      payload: id // Return the id of the deleted student
    });
  } catch (err) {
    console.error(err);
    // Optionally, dispatch a failure action
  }
};

