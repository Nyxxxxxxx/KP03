import React, { useState } from 'react';
import axios from 'axios';
import './StudentView.css';

const StudentView = () => {
  const [classCodeInput, setClassCodeInput] = useState('');
  const username = localStorage.getItem('username');

  const joinClass = async () => {
    const response = await axios.post('http://127.0.0.1:5000/join_class', {
      username: username,
      class_code: classCodeInput
    });
    if (response.data.success) {
      alert('Joined class successfully');
    } else {
      alert('Failed to join class');
    }
  };

  return (
    <div className="student-view-container">
      <div className="sidebar">
        <div className="profile">
          <div className="profile-pic"></div>
          <div className="profile-name">
            <p>{username}</p>
            <p>Student</p>
          </div>
        </div>
        <ul className="menu">
          <li className="menu-item">Dashboard</li>
          <li className="menu-item">Students</li>
          <li className="menu-item">Lecturer</li>
          <li className="menu-item">Attendance Recap</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="date">Monday, 22 July 2024</div>
          <div className="time">07:00 PM</div>
        </div>
        <div className="attendance-summary">
          <div className="summary-item present">Present<br />0</div>
          <div className="summary-item absent">Absent<br />0</div>
          <div className="summary-item late">Late<br />0</div>
          <div className="summary-item leave">Leave<br />0</div>
        </div>
        <div className="attendance-methods">
          <div className="method face-recognition">
            <div className="icon"></div>
            <button>Submit</button>
          </div>
          <div className="method fingerprint">
            <div className="icon"></div>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
