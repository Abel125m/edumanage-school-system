import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes/');
      setClasses(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch classes');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Classes</h2>
      <div className="entity-list">
        {classes.map(cls => (
          <div key={cls.id} className="entity-card">
            <h3>{cls.subject} - {cls.date}</h3>
            <p>Time: {cls.time}</p>
            <p>Duration: {cls.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;