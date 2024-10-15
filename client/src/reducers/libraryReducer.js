// src/reducers/libraryReducer.js

import {
    FETCH_OVERDUE_BOOKS,
    FETCH_OVERDUE_BOOKS_SUCCESS,
    FETCH_OVERDUE_BOOKS_FAILURE,
    ADD_BORROW_RECORD,
    UPDATE_BORROW_RECORD,
    DELETE_BORROW_RECORD
  } from '../actions/types';
  
  const initialState = {
    overdueBooks: [],
    loading: false,
    error: null
  };
  
  const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_OVERDUE_BOOKS:
        return { ...state, loading: true, error: null };
      case FETCH_OVERDUE_BOOKS_SUCCESS:
        return { ...state, overdueBooks: action.payload, loading: false };
      case FETCH_OVERDUE_BOOKS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      case ADD_BORROW_RECORD:
        return { ...state, overdueBooks: [...state.overdueBooks, action.payload] };
      case UPDATE_BORROW_RECORD:
        return {
          ...state,
          overdueBooks: state.overdueBooks.map((record) =>
            record._id === action.payload._id ? action.payload : record
          )
        };
      case DELETE_BORROW_RECORD:
        return {
          ...state,
          overdueBooks: state.overdueBooks.filter((record) => record._id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default libraryReducer;
  