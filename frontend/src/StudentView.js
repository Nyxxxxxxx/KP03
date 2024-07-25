import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentView = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/attendance/1', { withCredentials: true });
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div>
      <h2>Student Attendance</h2>
      <h2>First Linking </h2>
      <h2>교수님이 올리면 : 자동으로 뜬다 - 클릭하면 Face / Finger print 선택가능 </h2>
      <h2>DB에서 정보 긁어와서 보여준다. </h2>
      <ul>
        {attendance.map(record => (
          <li key={record.id}>{record.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentView;
