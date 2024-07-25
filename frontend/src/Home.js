import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Make sure to create a App.css file for styling

const Home = () => (
  <div className="home-container">
    <header className="home-header">
      <div className="home-logo">Smart-A</div>
      <nav className="home-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/logout">Logout</Link>
      </nav>
    </header>
    <main className="home-main">
      <section className="home-welcome">
        <h1>Welcome to</h1>
        <h2>Smart Attendance Website</h2>
        <p>Don't forget to submit your attendance on time!</p>
        <div className="home-buttons">
          <Link to="/login"><button className="home-button">Login</button></Link>
          <Link to="/register"><button className="home-button">Register</button></Link>
        </div>
      </section>
    </main>
  </div>
);

export default Home;
