import axiosInstance from '../utils/axiosInstance';
import {
  FETCH_OVERDUE_BOOKS,
  FETCH_OVERDUE_BOOKS_SUCCESS,
  FETCH_OVERDUE_BOOKS_FAILURE,
  ADD_BORROW_RECORD,
  LIBRARY_STATUS_ERROR

} from './types';

export const getLibraryRecords = () => async (dispatch) => {
  try {
    dispatch({ type: 'LIBRARY_RECORD_LIST_REQUEST' });

    const { data } = await axiosInstance.get('/library/history');

    dispatch({
      type: 'LIBRARY_RECORD_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'LIBRARY_RECORD_LIST_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const addLibraryRecord = (record) => async (dispatch) => {
   try {
    const res = await axiosInstance.post('/library/addrecord', record);

    dispatch({ type: 'LIBRARY_RECORD_ADD_REQUEST', payload: res.data });
    dispatch({
      type: 'LIBRARY_RECORD_ADD_SUCCESS',
    });
  } catch (error) {
    dispatch({
      type: 'LIBRARY_RECORD_ADD_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
// Fetch overdue books
export const fetchOverdueBooks = () => async (dispatch) => {
  
  dispatch({ type: FETCH_OVERDUE_BOOKS });

  try {
    const res = await axiosInstance.get('/library/overdue');

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
    const res = await axiosInstance.post('/library/addrecord', recordData);

    dispatch({
      type: ADD_BORROW_RECORD,
      payload: res.data // Newly created borrow record
    });
  } catch (err) {
    console.error(err);
  }
};

// Update an existing Borrow Record

export const updateBorrowStatus = (recordId, review) => async (dispatch) => {
  try {
    await axiosInstance.put(`/library/${recordId}/update`, { review });
    dispatch(getLibraryRecords()); // Fetch updated Library Students list after marking status
  } catch (error) {
    dispatch({
      type: LIBRARY_STATUS_ERROR,
      payload: error.response.statusText
    });
  }
};


export const getStudents = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/students/studentnames');
    dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_STUDENTS_FAIL', payload: error.message });
  }
};

export const getBooks = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get('/library/books');
    dispatch({ type: 'FETCH_BOOKS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_BOOKS_FAIL', payload: error.message });
  }
};