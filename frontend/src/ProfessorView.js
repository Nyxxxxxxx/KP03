// src/ProfessorView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfessorView = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:5000/students');
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const markAttendance = async (studentId) => {
    await axios.post('http://localhost:5000/attendance', { student_id: studentId, date: new Date().toISOString().split('T')[0] });
    alert('Attendance marked');
  };

  return (
    <div>
      <h2>Professor View</h2>
      <h2>Make Class</h2>
      <h2>수업 클릭하면, 수업 일자 확인 가능 - 출석 학생 정보 확인 가능!</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} <button onClick={() => markAttendance(student.id)}>Mark Attendance</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorView;
