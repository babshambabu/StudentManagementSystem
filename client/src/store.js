// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import studentReducer from './reducers/studentReducer';
import libraryReducer from './reducers/libraryReducer'; // Add library reducer
import feesReducer from './reducers/feesReducer'; // Add fees reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    library: libraryReducer,
    fees: feesReducer
  }
});
