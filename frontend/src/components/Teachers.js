import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/teachers/');
      setTeachers(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch teachers');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Teachers</h2>
      <div className="entity-list">
        {teachers.map(teacher => (
          <div key={teacher.id} className="entity-card">
            <h3>{teacher.first_name} {teacher.last_name}</h3>
            <p>Email: {teacher.email}</p>
            <p>Date of Birth: {teacher.date_of_birth}</p>
            <p>Enrollment Date: {teacher.enrollment_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teachers;