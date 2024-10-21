
  export const libraryRecordListReducer = (state = { libraryRecords: [] }, action) => {
    switch (action.type) {
      case 'LIBRARY_RECORD_LIST_REQUEST':
        return { loading: true, libraryRecords: [] };
      case 'LIBRARY_RECORD_LIST_SUCCESS':
        return { loading: false, libraryRecords: action.payload };
      case 'LIBRARY_RECORD_LIST_FAIL':
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const studentsReducer = (state = { students: [] }, action) => {
    switch (action.type) {
      case 'FETCH_STUDENTS_SUCCESS':
        return { students: action.payload };
      case 'FETCH_STUDENTS_FAIL':
        return { error: action.payload };
      default:
        return state;
    }
  };
  
  export const booksReducer = (state = { books: [] }, action) => {
    switch (action.type) {
      case 'FETCH_BOOKS_SUCCESS':
        return { books: action.payload };
      case 'FETCH_BOOKS_FAIL':
        return { error: action.payload };
      default:
        return state;
    }
  };