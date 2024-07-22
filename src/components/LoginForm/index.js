import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('All fields are required.');
      return;
    }

    axios.post('http://localhost:5000/login', { email, password })
      .then(response => {
        setMessage('Login successful!');
        localStorage.setItem('token', response.data.token);
        navigate('/');
      })
      .catch(error => {
        setMessage('Login failed. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Email:
        <input type="email" name="email" value={email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={password} onChange={handleChange} />
      </label>
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
