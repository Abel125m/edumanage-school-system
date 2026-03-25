import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/');
      setUsers(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <h2>Users</h2>
      <div className="entity-list">
        {users.map(user => (
          <div key={user.id} className="entity-card">
            <h3>{user.first_name} {user.last_name}</h3>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;