import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await api.get('/fees/');
      setFees(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch fees');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Fees</h2>
      <div className="entity-list">
        {fees.map(fee => (
          <div key={fee.id} className="entity-card">
            <h3>{fee.name}</h3>
            <p>{fee.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fees;