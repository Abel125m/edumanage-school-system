import React from 'react';
import './Home.css';

function About() {
  return (
    <div className="home">
      <div className="hero">
        <h1>About EduManage</h1>
        <p>EduManage is a school management platform for attendance, students, classes, teachers, exams, fees, and results.</p>
        <div className="features">
          <div className="feature-card">
            <h3>Mission</h3>
            <p>Provide an intuitive dashboard for school administrators and teachers.</p>
          </div>
          <div className="feature-card">
            <h3>Vision</h3>
            <p>Enable data-driven decisions, streamline operations, and improve student outcomes.</p>
          </div>
          <div className="feature-card">
            <h3>Secure access</h3>
            <p>Login and session-based access with JSON Web Tokens (JWT).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
