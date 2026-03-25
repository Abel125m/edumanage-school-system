import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Subjects from './components/Subjects';
import Classes from './components/Classes';
import Exams from './components/Exams';
import Results from './components/Results';
import Attendance from './components/Attendance';
import Fees from './components/Fees';
import Users from './components/Users';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setLoading(false);

    // Globally handle 401 and auto-logout
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: refreshToken,
              });
              const newAccess = refreshResponse.data.access;
              localStorage.setItem('access_token', newAccess);
              axios.defaults.headers.common.Authorization = `Bearer ${newAccess}`;

              const config = error.config;
              config.headers.Authorization = `Bearer ${newAccess}`;
              return axios(config);
            } catch (refreshErr) {
              // refresh fails -> logout
            }
          }

          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setIsAuthenticated(false);
          delete axios.defaults.headers.common.Authorization;
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    delete axios.defaults.headers.common.Authorization;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">EduManage</Link>
            <ul className="nav-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              {!isAuthenticated && <li><Link to="/login">Login</Link></li>}

              {isAuthenticated && (
                <>
                  <li><Link to="/students">Students</Link></li>
                  <li><Link to="/teachers">Teachers</Link></li>
                  <li><Link to="/subjects">Subjects</Link></li>
                  <li><Link to="/classes">Classes</Link></li>
                  <li><Link to="/exams">Exams</Link></li>
                  <li><Link to="/results">Results</Link></li>
                  <li><Link to="/attendance">Attendance</Link></li>
                  <li><Link to="/fees">Fees</Link></li>
                  <li><Link to="/users">Users</Link></li>
                  <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
          <Route path="/teachers" element={<PrivateRoute><Teachers /></PrivateRoute>} />
          <Route path="/subjects" element={<PrivateRoute><Subjects /></PrivateRoute>} />
          <Route path="/classes" element={<PrivateRoute><Classes /></PrivateRoute>} />
          <Route path="/exams" element={<PrivateRoute><Exams /></PrivateRoute>} />
          <Route path="/results" element={<PrivateRoute><Results /></PrivateRoute>} />
          <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
          <Route path="/fees" element={<PrivateRoute><Fees /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
