import axios from 'axios';
import { store } from '../store'; // Correct import

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`, // Adjust based on your backend URL
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;
    if (token) {
      config.headers['auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
