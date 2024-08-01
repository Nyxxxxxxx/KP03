import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentView from './StudentView';
import ProfessorView from './ProfessorView';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Contact from './Contact';

function App() {
  const [professorId, setProfessorId] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setProfessorId={setProfessorId} />} />
          <Route path="/student" element={<StudentView />} />
          <Route path="/professor" element={<ProfessorView professorId={professorId} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
