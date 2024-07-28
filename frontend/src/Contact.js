import React from 'react';
import './App.css';

const Contact = () => (
  <div className="contact-container">
    <header className="contact-header">
      <div className="contact-images">
        <img src="/images/knu.png" alt="Image 1" className="contact-image1" />
        <img src="/images/Polije.png" alt="Image 2" className="contact-image" />
        
      </div>
      <h1>Contact Us</h1>
    </header>
    <main className="contact-main">
      <section className="contact-info">
        <p>If you have any questions, please feel free to reach out to us:</p>
        <ul>
          <li>Email: support@smartattendance.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Address: 123 Smart St, Jember City</li>
        </ul>
      </section>
    </main>
  </div>
);

export default Contact;
