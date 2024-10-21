import axiosInstance from "../utils/axiosInstance";

export const addUser = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/users/addUser', userData);
    dispatch({ type: 'ADD_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_USER_FAIL', payload: error.message });
  }
};
