import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to Smart Attendance Website</h1>
    <Link to="/login"><button>Login</button></Link>
    <Link to="/register"><button>Register</button></Link>
  </div>
);

export default Home;
