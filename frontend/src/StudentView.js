// src/StudentView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentView = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await axios.get('http://localhost:5000/attendance/1'); // Replace with dynamic student ID
      setAttendance(response.data);
    };
    fetchAttendance();
  }, []);

  return (
    <div>
      <h2>Student Attendance</h2>
      <ul>
        {attendance.map(record => (
          <li key={record.id}>{record.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentView;
