import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfessorView = () => {
  const [classCode, setClassCode] = useState('');
  const [students, setStudents] = useState([]);

  const createClass = async () => {
    const response = await axios.post('http://127.0.0.1:5000/create_class');
    setClassCode(response.data.class_code);
    alert(`Class created with code: ${response.data.class_code}`);
  };

  useEffect(() => {
    if (classCode) {
      const fetchStudents = async () => {
        const response = await axios.get(`http://127.0.0.1:5000/class_students/${classCode}`);
        setStudents(response.data);
      };
      fetchStudents();
    }
  }, [classCode]);

  const markAttendance = async (studentId) => {
    await axios.post('http://localhost:5000/attendance', { student_id: studentId, date: new Date().toISOString().split('T')[0] });
    alert('Attendance marked');
  };

  return (
    <div>
      <h2>Professor View</h2>
      <button onClick={createClass}>Create Class</button>
      {classCode && <p>Class Code: {classCode}</p>}
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.username} <button onClick={() => markAttendance(student.id)}>Mark Attendance</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorView;
