import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentView.css';

const StudentView = () => {
  const [classCodeInput, setClassCodeInput] = useState('');
  const username = localStorage.getItem('username');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const profilePicUrl = "/images/user.png";
  const navigate = useNavigate();

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

  const logout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Jakarta', 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      const date = new Intl.DateTimeFormat('en-US', options).format(now);
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
      });

      setCurrentDate(date.split(',')[0] + ', ' + date.split(',')[1]);
      setCurrentTime(time);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="student-view-container">
      <div className="sidebar">
        <div className="profile">
          <div className="profile-pic">
            <img src={profilePicUrl} alt="Profile" />
          </div>
          <div className="profile-name">
            <p>{username}</p>
            <p>Student</p>
          </div>
        </div>
        <ul className="menu">
          <li className="menu-item">Dashboard</li>
          <li className="menu-item">Student</li>
          <li className="menu-item">Lecture</li>
          <li className="menu-item">Attendance</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="date">{currentDate}</div>
          <div className="time">
            {currentTime}
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
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
