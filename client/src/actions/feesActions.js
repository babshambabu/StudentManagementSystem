import axios from 'axios';
import {
  FETCH_UNPAID_FEES,
  FETCH_UNPAID_FEES_SUCCESS,
  FETCH_UNPAID_FEES_FAILURE,
  ADD_FEE_RECORD,
  UPDATE_FEE_RECORD,
  DELETE_FEE_RECORD
} from './types';

// Fetch unpaid fees
export const fetchUnpaidFees = () => async (dispatch) => {
  dispatch({ type: FETCH_UNPAID_FEES });

  try {
    const res = await axios.get('/api/fees/unpaid');

    dispatch({
      type: FETCH_UNPAID_FEES_SUCCESS,
      payload: res.data // List of unpaid fees
    });
  } catch (err) {
    dispatch({
      type: FETCH_UNPAID_FEES_FAILURE,
      payload: err.response.data.message
    });
  }
};

// Add a new Fee Record
export const addFeeRecord = (feeData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/fees', feeData);

    dispatch({
      type: ADD_FEE_RECORD,
      payload: res.data // Newly created fee record
    });
  } catch (err) {
    console.error(err);
  }
};

// Update an existing Fee Record
export const updateFeeRecord = (id, feeData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/fees/${id}`, feeData);

    dispatch({
      type: UPDATE_FEE_RECORD,
      payload: res.data // Updated fee record
    });
  } catch (err) {
    console.error(err);
  }
};

// Delete a Fee Record
export const deleteFeeRecord = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/fees/${id}`);

    dispatch({
      type: DELETE_FEE_RECORD,
      payload: id // Return the id of the deleted fee record
    });
  } catch (err) {
    console.error(err);
  }
};
