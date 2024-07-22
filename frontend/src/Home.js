import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to Smart Attendance Website</h1>
    <Link to="/student"><button>Student</button></Link>
    <Link to="/professor"><button>Professor</button></Link>
    <Link to="/register"><button>Register</button></Link>
  </div>
);

export default Home;
