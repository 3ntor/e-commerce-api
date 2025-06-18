import React, { useState } from 'react';
import './Login.css';
import { API_URL } from '../App';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('Attempting login with:', credentials);
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });
      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Fetch user data after login
        const userDataResponse = await fetch(`${API_URL}/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${data.token}`
          },
          credentials: 'include'
        });
        console.log('User data response status:', userDataResponse.status);
        const userData = await userDataResponse.json();
        console.log('User data:', userData);
        
        if (userDataResponse.ok) {
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.href = '/dashboard';
        } else {
          setError('Failed to fetch user data');
        }
      } else {
        // data already read above. It may contain message
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
