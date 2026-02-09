import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Dashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [buses, setBuses] = useState([
    { id: 1, name: 'Bus A1', route: 'Main Campus → Hostel', nextArrival: '5 mins', status: 'On Time' },
    { id: 2, name: 'Bus A2', route: 'Hostel → Tech Park', nextArrival: '12 mins', status: 'On Time' },
    { id: 3, name: 'Bus B1', route: 'Main Gate → Library', nextArrival: '8 mins', status: 'Delayed' },
  ]);

  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (!storedUser) {
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
          <h2>Welcome, {user.name}! 👋</h2>
          <p>Track your buses and stay updated with real-time information</p>
        </div>

        <div className="dashboard-grid">
          <div className="card">
            <h3>📍 Your Profile</h3>
            <div className="card-content">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>

          <div className="card">
            <h3>📊 Quick Stats</h3>
            <div className="card-content">
              <p><strong>Buses Available:</strong> {buses.length}</p>
              <p><strong>Active Routes:</strong> 3</p>
              <p><strong>Last Login:</strong> Today</p>
            </div>
          </div>
        </div>

        <div className="buses-section">
          <h3>🚌 Available Buses</h3>
          <div className="buses-list">
            {buses.map((bus) => (
              <div key={bus.id} className="bus-card">
                <div className="bus-info">
                  <h4>{bus.name}</h4>
                  <p className="route">{bus.route}</p>
                </div>
                <div className="bus-details">
                  <span className={`status ${bus.status === 'On Time' ? 'on-time' : 'delayed'}`}>
                    {bus.status}
                  </span>
                  <span className="next-arrival">{bus.nextArrival}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
