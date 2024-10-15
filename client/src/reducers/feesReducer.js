import {
    FETCH_UNPAID_FEES,
    FETCH_UNPAID_FEES_SUCCESS,
    FETCH_UNPAID_FEES_FAILURE,
    ADD_FEE_RECORD,
    UPDATE_FEE_RECORD,
    DELETE_FEE_RECORD
  } from '../actions/types';
  
  const initialState = {
    unpaidFees: [],
    loading: false,
    error: null
  };
  
  const feesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_UNPAID_FEES:
        return { ...state, loading: true, error: null };
      case FETCH_UNPAID_FEES_SUCCESS:
        return { ...state, unpaidFees: action.payload, loading: false };
      case FETCH_UNPAID_FEES_FAILURE:
        return { ...state, error: action.payload, loading: false };
      case ADD_FEE_RECORD:
        return { ...state, unpaidFees: [...state.unpaidFees, action.payload] };
      case UPDATE_FEE_RECORD:
        return {
          ...state,
          unpaidFees: state.unpaidFees.map((fee) =>
            fee._id === action.payload._id ? action.payload : fee
          )
        };
      case DELETE_FEE_RECORD:
        return {
          ...state,
          unpaidFees: state.unpaidFees.filter((fee) => fee._id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default feesReducer;
  