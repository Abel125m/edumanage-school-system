import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await api.get('/results/');
      setResults(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch results');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Results</h2>
      <div className="entity-list">
        {results.map(result => (
          <div key={result.id} className="entity-card">
            <h3>{result.subject}</h3>
            <p>Date: {result._date}</p>
            <p>Time: {result.time}</p>
            <p>Total Marks: {result.total_marks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;