import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Router>
      {/* Global premium navigation layout */}
      <Navbar /> 
      
      <div className="main-content">
        <Routes>
          {/* Automatically redirect home path straight to appointments page */}
          <Route path="/" element={<Navigate to="/appointments" replace />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;