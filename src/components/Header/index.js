import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = () => (
  <header className="header">
    <h1>Fn App</h1>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/assessment-tasks">Assessment Tasks</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
