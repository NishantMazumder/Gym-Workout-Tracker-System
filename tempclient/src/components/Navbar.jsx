// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear(); // Clear authentication data
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">GYM Workout Tracker</h2>
      <ul className="navbar-links">
        <li>
          <Link to="/Workouts">Dashboard</Link>
        </li>
        <li>
          <Link to="/new-workout">New Workout</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        
        <li></li>
        <li><p>    </p></li>
        <li> <p>Nishank(366)  Nishant(367)</p> </li>
      </ul>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;