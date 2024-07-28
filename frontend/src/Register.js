import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        name,
        username,
        password,
        role,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div className="custom-register-container">
      <div className="custom-form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-container">
            <label>SchoolID</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-container">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
