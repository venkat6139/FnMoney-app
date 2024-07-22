// src/components/LandingPage.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LandingPage extends Component {
  
  render() {
    return (
      <div className="landing-page">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/assessment-tasks">Assessment Tasks</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <h1>Welcome to Our React Application</h1>
      </div>
    );
  }
}

export default LandingPage;
