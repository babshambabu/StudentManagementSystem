import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './features/common/headerSlice'
import modalSlice from './features/common/modalSlice'
import rightDrawerSlice from './features/common/rightDrawerSlice'
import leadsSlice from './features/leads/leadSlice'
import authReducer from './reducers/authReducer';
import studentReducer from './reducers/studentReducer';
import libraryReducer from './reducers/libraryReducer'; // Add library reducer
import feesReducer from './reducers/feesReducer'; // Add fees reducer

export const store = configureStore({
  reducer: {
    header : headerSlice,
    rightDrawer : rightDrawerSlice,
    modal : modalSlice,
    lead : leadsSlice,
    auth: authReducer,
    students: studentReducer,
    library: libraryReducer,
    fees: feesReducer
  }
});



