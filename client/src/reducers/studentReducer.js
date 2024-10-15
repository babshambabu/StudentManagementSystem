const initialState = {
    students: [],
    loading: false,
    error: null
  };
  
  export default function studentReducer(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_STUDENTS':
        return { ...state, loading: true };
      case 'FETCH_STUDENTS_SUCCESS':
        return { ...state, students: action.payload, loading: false };
      case 'FETCH_STUDENTS_FAILURE':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  }
  