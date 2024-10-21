import { GET_FEES, ADD_FEE, GET_STUDENTS, FEES_ERROR } from '../actions/types';

const initialState = {
  fees: [],
  students: [],
  loading: true,
  error: null
};

export default function feesReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FEES:
      return {
        ...state,
        fees: payload,
        loading: false
      };
    case ADD_FEE:
      return {
        ...state,
        fees: [payload, ...state.fees],
        loading: false
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: payload,
        loading: false
      };
    case FEES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
