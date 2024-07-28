import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentView.css';

const StudentView = () => {
  const [classCodeInput, setClassCodeInput] = useState('');
  const username = localStorage.getItem('username');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [userInfo, setUserInfo] = useState(null);
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

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/user_info/${username}`);
      setUserInfo(response.data);
      setActiveMenu('profile');
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
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

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <div className="attendance-summary">
            <div className="summary-item present">Present<br />0</div>
            <div className="summary-item absent">Absent<br />0</div>
            <div className="summary-item late">Late<br />0</div>
            <div className="summary-item leave">Leave<br />0</div>
          </div>
        );
      case 'student':
        return <div>Student Content</div>;
      case 'lecture':
        return <div>Lecture Content</div>;
      case 'attendance':
        return (
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
        );
      case 'profile':
        return userInfo && (
          <div className="profile-info">
            <h2>Profile Information</h2>
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Username:</strong> {userInfo.username}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
          </div>
        );
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="student-view-container">
      <div className="sidebar">
        <div className="profile">
          <div className="profile-pic" onClick={fetchUserInfo}>
            <img src={profilePicUrl} alt="Profile" />
          </div>
          <div className="profile-name">
            <p>{username}</p>
            <p>Student</p>
          </div>
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => setActiveMenu('dashboard')}>Dashboard</li>
          <li className="menu-item" onClick={() => setActiveMenu('student')}>Student</li>
          <li className="menu-item" onClick={() => setActiveMenu('lecture')}>Lecture</li>
          <li className="menu-item" onClick={() => setActiveMenu('attendance')}>Attendance</li>
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
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentView;
