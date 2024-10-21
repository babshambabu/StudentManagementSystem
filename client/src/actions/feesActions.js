import axiosInstance from '../utils/axiosInstance';
import { GET_FEES, ADD_FEE, GET_STUDENTS, FEES_ERROR } from './types';

// Get Fees
export const getFees = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/fees');
    dispatch({
      type: GET_FEES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FEES_ERROR,
      payload: error.response.statusText
    });
  }
};
// Mark Fee as Paid
export const updateFeeStatus = (feeId, remark) => async (dispatch) => {
  try {
    await axiosInstance.put(`/fees/${feeId}/mark-paid`, { remark });
    dispatch(getFees()); // Fetch updated fee list after marking as paid
  } catch (error) {
    dispatch({
      type: FEES_ERROR,
      payload: error.response.statusText
    });
  }
};

// Add Fee
export const addFee = (feeData) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/fees', feeData);
    dispatch({
      type: ADD_FEE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FEES_ERROR,
      payload: error.response.statusText
    });
  }
};

// Get Students for Dropdown
export const getStudents = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/students/students');
    dispatch({
      type: GET_STUDENTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FEES_ERROR,
      payload: error.response.statusText
    });
  }
};
