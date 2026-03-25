import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await api.get('/subjects/');
      setSubjects(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch subjects');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Subjects</h2>
      <div className="entity-list">
        {subjects.map(subject => (
          <div key={subject.id} className="entity-card">
            <h3>{subject.name}</h3>
            <p>{subject.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects;