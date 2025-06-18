import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ApiTester from './ApiTester';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [showTester, setShowTester] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Fetch user data (example)
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        setUserData(userData);

        // Fetch additional user stats (example)
        try {
          const statsResponse = await fetch('http://localhost:5000/api/admin/stats', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setUserData(prev => ({
              ...prev,
              stats: statsData
            }));
          } else {
            // Endpoint might not exist yet; ignore gracefully
            console.warn('Stats endpoint unavailable (', statsResponse.status, ')');
          }
        } catch (err) {
          console.warn('Failed to fetch stats:', err.message);
        }
      } catch (error) {
        console.error('Dashboard error:', error);
        // Keep user on dashboard even if stats fail

      }
    };

    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="user-info">
          <h3>Welcome, {userData.name}</h3>
          <p>Email: {userData.email}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
      <main className="main-content">
        <h2>Dashboard</h2>
        <div className="dashboard-content">
          <div className="stats-card">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <h4>Total Users</h4>
                <p>100</p>
              </div>
              <div className="stat-item">
                <h4>Active Users</h4>
                <p>75</p>
              </div>
              <div className="stat-item">
                <h4>New Users</h4>
                <p>25</p>
              </div>
            </div>
          </div>
          <button onClick={() => setShowTester(!showTester)} className="toggle-tester-btn">
            {showTester ? 'Hide' : 'Show'} API Tester
          </button>
          {showTester && <ApiTester />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
