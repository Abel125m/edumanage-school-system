import React, { useState, useEffect } from 'react';
import api from '../api';
import './Entity.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students/');
      setStudents(response.data.results || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch students');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.date_of_birth) {
      setFormError('All fields are required');
      return;
    }

    try {
      await api.post('/students/', formData);

      setFormData({ first_name: '', last_name: '', email: '', date_of_birth: '' });
      setShowForm(false);
      fetchStudents();
    } catch (err) {
      setFormError('Failed to add student. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="entity-container">
      <div className="entity-header">
        <h2>Students</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Student</button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button className="close-btn" onClick={() => setShowForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {formError && <div className="form-error">{formError}</div>}
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Add Student</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="entity-list">
        {students.map(student => (
          <div key={student.id} className="entity-card">
            <h3>{student.first_name} {student.last_name}</h3>
            <p>Email: {student.email}</p>
            <p>Date of Birth: {student.date_of_birth}</p>
            <p>Enrollment Date: {student.enrollment_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;