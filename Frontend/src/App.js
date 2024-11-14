import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Events from "./pages/Events";
import New_event from "./pages/New_Events";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Workouts from "./pages/Workouts";
import New_Workout from "./pages/New_Workout";
import Profile from "./pages/Profile"; // Import Profile component

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage

  return (
    <Router>
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Profile route, which is the default page after login */}
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile userId={userId} /> : <Navigate to="/login" />}
        />

        {/* Admin-only routes */}
        {isAuthenticated && userRole === "admin" && (
          <>

            <Route path="/New_Events" element={<New_event />} />
//          <Route path="/Update/:id" element={<Update />} />
          </>
        )}

        {/* Events page, accessible to all authenticated users */}
        <Route
          path="/events"
          element={isAuthenticated ? <Events /> : <Navigate to="/login" />}
        />

        {/* Workouts routes */}
        <Route
          path="/workouts"
          element={isAuthenticated ? <Workouts userId={userId} /> : <Navigate to="/login" />}
        />
        <Route
          path="/new-workout"
          element={isAuthenticated ? <New_Workout userId={userId} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
