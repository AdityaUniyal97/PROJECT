import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import StudentDashboard from '../pages/StudentDashboard';
import DriverDashboard from '../pages/DriverDashboard';
import authService from '../services/authService';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isLoggedIn = authService.isLoggedIn();
  const user = authService.getStoredUser();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    return user?.role === 'driver' ? (
      <Navigate to="/driver" replace />
    ) : (
      <Navigate to="/student" replace />
    );
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Driver Dashboard */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute requiredRole="driver">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
