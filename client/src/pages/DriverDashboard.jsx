import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Dashboard.css';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [busStatus] = useState({
    busNumber: 'DL-01-AB-1234',
    currentRoute: 'Main Campus → Hostel',
    passengers: 45,
    capacity: 60,
    status: 'On Schedule',
    nextStop: 'Tech Park Gate',
  });

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (!storedUser || storedUser.role !== 'driver') {
      navigate('/');
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="nav-left">
          <div className="logo-small">
            <span>GEU</span>
          </div>
          <h1>Bus Tracking System</h1>
        </div>
        <div className="nav-right">
          <span className="user-name">{user.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, Driver {user.name}! 🚌</h2>
          <p>Monitor your bus and manage your route efficiently</p>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h3>🆔 Driver Info</h3>
            <div className="card-content">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> Driver</p>
            </div>
          </div>

          <div className="card">
            <h3>📅 Today's Summary</h3>
            <div className="card-content">
              <p><strong>Trips Completed:</strong> 3</p>
              <p><strong>Current Status:</strong> Active</p>
              <p><strong>Rating:</strong> 4.8 ⭐</p>
            </div>
          </div>
        </div>

        <div className="buses-section">
          <h3>🚌 Current Bus Status</h3>
          <div className="bus-status-card">
            <div className="status-header">
              <h4>Bus Number: {busStatus.busNumber}</h4>
              <span className={`status on-time`}>{busStatus.status}</span>
            </div>

            <div className="status-grid">
              <div className="status-item">
                <label>Current Route</label>
                <p>{busStatus.currentRoute}</p>
              </div>
              <div className="status-item">
                <label>Next Stop</label>
                <p>{busStatus.nextStop}</p>
              </div>
              <div className="status-item">
                <label>Passengers</label>
                <p>{busStatus.passengers} / {busStatus.capacity}</p>
              </div>
              <div className="status-item">
                <label>Occupancy</label>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(busStatus.passengers / busStatus.capacity) * 100}%` }}></div>
                </div>
                <p>{Math.round((busStatus.passengers / busStatus.capacity) * 100)}%</p>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary">Start Trip</button>
              <button className="btn btn-secondary">Update Location</button>
              <button className="btn btn-danger">Report Issue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
