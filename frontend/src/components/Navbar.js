import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="med-navbar">
      <div className="med-logo">
        <span className="plus-icon">✚</span> MEDICARE
      </div>
      
      <ul className="med-nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#doctors">Doctors List</a></li>
        <li><a href="#services">Services</a></li>
      </ul>

      <div className="nav-actions-wrapper">
        {/* Premium Login Dropdown Trigger */}
        <div className="login-dropdown-container">
          <button 
            className="login-nav-btn" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Login {showDropdown ? "▲" : "▼"}
          </button>
          
          {showDropdown && (
            <div className="nav-login-card">
              <h3>System Access</h3>
              <p className="demo-hint">Use credentials below to log in:</p>
              
              <div className="credential-badge-row">
                <span><strong>ID:</strong> 100</span>
                <span><strong>Pass:</strong> masai</span>
              </div>
              
              <hr />
              <button className="submit-action-btn" onClick={() => alert("Logged in with default profile!")}>
                Quick Login
              </button>
            </div>
          )}
        </div>

        {/* Existing Book Button */}
        <Link to="/appointments" className="report-btn">
          Book Appointment ↗
        </Link>
      </div>
    </nav>
  );
}