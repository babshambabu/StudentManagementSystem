import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './features/common/headerSlice'
import modalSlice from './features/common/modalSlice'
import authReducer from './reducers/authReducer';
import studentReducer from './reducers/studentReducer';
import { libraryRecordListReducer, studentsReducer, booksReducer } from './reducers/libraryReducer';
import feesReducer from './reducers/feesReducer'; // Add fees reducer
export const store = configureStore({
  reducer: {
    header : headerSlice,
    modal : modalSlice,
    auth: authReducer,
    students: studentReducer,
    libraryRecordList: libraryRecordListReducer,
    studentsList: studentsReducer,
    booksList: booksReducer,
    fees: feesReducer
  }
});



