import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentView from './StudentView';
import ProfessorView from './ProfessorView';
import Home from './Home';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentView />} />
          <Route path="/professor" element={<ProfessorView />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
