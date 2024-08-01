import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfessorView = ({ professorId }) => {
  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleNewClassNameChange = (event) => {
    setNewClassName(event.target.value);
  };

  const handleNewClassCodeChange = (event) => {
    setNewClassCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      name: newClassName,
      code: newClassCode,
      professor_id: professorId
    };
    console.log("Request data:", requestData);
    try {
      const response = await axios.post('http://127.0.0.1:5000/create_class', requestData);
      setClassName(response.data.name);
      setClassCode(response.data.code);
      alert(`Class created with name: ${response.data.name} and code: ${response.data.code}`);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Failed to create class");
    }
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

  return (
    <div>
      <h2>Professor View</h2>
      <button onClick={toggleForm}>New Lecture</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Lecture Name:
              <input type="text" value={newClassName} onChange={handleNewClassNameChange} required />
            </label>
          </div>
          <div>
            <label>
              Lecture Code:
              <input type="text" value={newClassCode} onChange={handleNewClassCodeChange} required />
            </label>
          </div>
          <button type="submit">Create Lecture</button>
        </form>
      )}
      {classCode && <p>Class Code: {classCode}</p>}
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorView;
