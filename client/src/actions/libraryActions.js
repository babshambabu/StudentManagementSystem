import axios from 'axios';
import {
  FETCH_OVERDUE_BOOKS,
  FETCH_OVERDUE_BOOKS_SUCCESS,
  FETCH_OVERDUE_BOOKS_FAILURE,
  ADD_BORROW_RECORD,
  UPDATE_BORROW_RECORD,
  DELETE_BORROW_RECORD
} from './types';

// Fetch overdue books
export const fetchOverdueBooks = () => async (dispatch) => {
  dispatch({ type: FETCH_OVERDUE_BOOKS });

  try {
    const res = await axios.get('/api/library/overdue');

    dispatch({
      type: FETCH_OVERDUE_BOOKS_SUCCESS,
      payload: res.data // List of overdue books
    });
  } catch (err) {
    dispatch({
      type: FETCH_OVERDUE_BOOKS_FAILURE,
      payload: err.response.data.message
    });
  }
};

// Add a new Borrow Record
export const addBorrowRecord = (recordData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/library', recordData);

    dispatch({
      type: ADD_BORROW_RECORD,
      payload: res.data // Newly created borrow record
    });
  } catch (err) {
    console.error(err);
  }
};

// Update an existing Borrow Record
export const updateBorrowRecord = (id, recordData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/library/${id}`, recordData);

    dispatch({
      type: UPDATE_BORROW_RECORD,
      payload: res.data // Updated borrow record
    });
  } catch (err) {
    console.error(err);
  }
};

// Delete a Borrow Record
export const deleteBorrowRecord = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/library/${id}`);

    dispatch({
      type: DELETE_BORROW_RECORD,
      payload: id // Return the id of the deleted borrow record
    });
  } catch (err) {
    console.error(err);
  }
};
