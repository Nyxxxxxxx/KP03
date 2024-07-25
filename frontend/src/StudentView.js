import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Student Information</h1>
      <p>Welcome, {username}!</p>
      <p>Your role is: student</p>
      <input 
        type="text" 
        placeholder="Enter Class Code" 
        value={classCodeInput} 
        onChange={(e) => setClassCodeInput(e.target.value)} 
      />
      <button onClick={joinClass}>Join Class</button>
    </div>
  );
};

export default StudentView;
