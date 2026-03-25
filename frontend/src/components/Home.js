import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to EduManage</h1>
        <p>Comprehensive School Management System</p>
        <div className="features">
          <div className="feature-card">
            <h3>Student Management</h3>
            <p>Manage student records, enrollment, and progress tracking.</p>
          </div>
          <div className="feature-card">
            <h3>Teacher Administration</h3>
            <p>Handle teacher information and assignments.</p>
          </div>
          <div className="feature-card">
            <h3>Subject Organization</h3>
            <p>Organize curriculum subjects and course materials.</p>
          </div>
          <div className="feature-card">
            <h3>Class Scheduling</h3>
            <p>Schedule classes, manage timetables, and track attendance.</p>
          </div>
          <div className="feature-card">
            <h3>Exam Management</h3>
            <p>Create and manage examinations and assessments.</p>
          </div>
          <div className="feature-card">
            <h3>Results Tracking</h3>
            <p>Record and analyze student performance results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;