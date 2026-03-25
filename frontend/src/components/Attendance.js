import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await api.get('/attendance/');
      setAttendance(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch attendance');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Attendance</h2>
      <div className="entity-list">
        {attendance.map(att => (
          <div key={att.id} className="entity-card">
            <h3>{att.subject}</h3>
            <p>Date: {att.date}</p>
            <p>Time: {att.time}</p>
            <p>Duration: {att.duration}</p>
            <p>Total Marks: {att.total_marks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;