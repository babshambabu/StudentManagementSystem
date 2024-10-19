import React, { lazy, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import checkAuth from './app/auth';
import initializeApp from './app/init';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
//import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { getUserDetails } from './actions/authActions';
import PrivateRoute from './components/PrivateRoute';
import {
  AUTH_ERROR
} from './actions/types';
import StudentsPage from './pages/studentPage';
import StudentList from './pages/StudentList';


// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Register = lazy(() => import('./pages/Register'))
const Documentation = lazy(() => import('./pages/Documentation'))

// Initializing different libraries
initializeApp()





const App = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, role, loading } = useSelector((state) => state.auth);
//console.log(token, isAuthenticated, role, loading)
  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token));
    }
    else
    dispatch({
      type: AUTH_ERROR
    });

  }, [dispatch, token]);

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>


          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
          
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />
          <Route path="/addStudent" element={<StudentsPage />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/login"} replace />}/>



          
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              !isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/app/dashboard" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="*" element={<Navigate to={!isAuthenticated ? "/app/welcome" : "/login"} replace />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
