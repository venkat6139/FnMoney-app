import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage('All fields are required.');
      return;
    }

    axios.post('http://localhost:5000/register', { username, email, password })
      .then(response => {
        setMessage('Registration successful!');
        navigate('/login');
      })
      .catch(error => {
        setMessage('Registration failed. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Username:
        <input type="text" name="username" value={username} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleChange} />
      </label>
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
