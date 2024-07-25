import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Assuming you have a CSS file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        localStorage.setItem('username', username); // 사용자 이름 저장
        if (response.data.role === 'student') {
          navigate('/student');
        } else if (response.data.role === 'professor') {
          navigate('/professor');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="custom-body">
      <div className="custom-login-container">
        <div className="custom-form-container">
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <label>Enter your ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <label>Enter your password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-prompt">Don’t have an account? <a href="/signup">Signup</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
