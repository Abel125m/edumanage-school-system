import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await api.get('/exams/');
      setExams(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch exams');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Exams</h2>
      <div className="entity-list">
        {exams.map(exam => (
          <div key={exam.id} className="entity-card">
            <h3>{exam.name}</h3>
            <p>{exam.description}</p>
            <p>Date: {exam.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exams;