
import axiosInstance from '../utils/axiosInstance';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR
} from './types';

// Load User (Check if user is authenticated)
export const getUserDetails = (token) => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/auth/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data // Contains user info including role
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/auth/login', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data // token and user role
    });

    // Save token to localStorage
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout User
export const logout = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('token');

  dispatch({ type: LOGOUT });
};
