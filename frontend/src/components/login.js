// components/Login.jsx
import React, { useState } from 'react';
import '../styles/Login.css';

export default function Login() {
  const [activeRole, setActiveRole] = useState('Nurse');
  const [credentials, setCredentials] = useState({ id: '', password: '' });

  return (
    <div className="login-page-container">
      {/* Left Vector Banner Section */}
      <div className="login-banner-side">
        <div className="illustration-placeholder">
          {/* You can replace this wrapper with a real medical SVG or Image URL */}
          <img src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg" alt="Medical staff banner" />
        </div>
      </div>

      {/* Right Form Control Side */}
      <div className="login-form-side">
        <div className="login-card">
          <h2>Login</h2>
          
          {/* Segmented Control Toggles */}
          <div className="role-tab-group">
            {['Nurse', 'Doctor', 'Admin'].map((role) => (
              <button 
                key={role}
                className={`role-tab ${activeRole === role ? 'active' : ''}`}
                onClick={() => setActiveRole(role)}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="avatar-badge">👤</div>
          <p className="demo-hint">ID - 100 | Password - masai</p>

          <div className="input-field-wrapper">
            <label>{activeRole} ID</label>
            <input 
              type="text" 
              placeholder={`Enter your ${activeRole.toLowerCase()} identifier`} 
            />
          </div>

          <div className="input-field-wrapper">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="submit-action-btn">Submit</button>
          <p className="forgot-prompt">Forgot Password? <a href="#email">Get it on Email!</a></p>
        </div>
      </div>
    </div>
  );
}