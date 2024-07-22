import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import AssessmentForm from './components/AssessmentForm';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          
          <Route
            path="/landing"
            element={<PrivateRoute element={<LandingPage />} />}
          />
          <Route
            path="/assessment-tasks"
            element={<PrivateRoute element={<AssessmentForm />} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
