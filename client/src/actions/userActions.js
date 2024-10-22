import axiosInstance from "../utils/axiosInstance";
// import {GET_USERS_SUCCESS,GET_USERS_FAIL,LIST_USERS,ADD_USER,DELETE_USER} from './types';


// Action to list users
export const listUsers = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/users'); // Fetch users from backend
    dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data }); // response.data contains the fetched user data
  } catch (error) {
    console.error('Error fetching users:', error);
    dispatch({ type: 'GET_USERS_FAIL', payload: error.message });
  }
};

// Action to add a new user
export const addUser = (user) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/users', user); // Include the user data in the POST request body
    console.log("response.data",response.data) ;
    dispatch({ type: 'ADD_USER', payload: response.data }); // response.data contains the newly created user
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Action to delete a user
export const deleteUser = (userId) => async (dispatch) => {
  try {

    await axiosInstance.delete(`/users/${userId}`); // Delete request for the user
    dispatch({ type: 'DELETE_USER', payload: userId }); // Dispatch the action to remove the user from the store
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

// Action to change the user's password
export const changePassword = (userId, password) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}/password`, { password }); // Send new password in request body
    dispatch({ type: 'CHANGE_PASSWORD', payload: userId }); // Dispatch action if needed
  } catch (error) {
    console.error('Error changing password:', error);
  }
};