import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import "./Workout.css";

const Workouts = ({ userId }) => {
  const [workouts, setWorkouts] = useState([]);

  const handleDelete = async (workoutId) => {
    try {
      const response = await axios.delete(`http://localhost:8100/workouts/${workoutId}`);
      setWorkouts(workouts.filter((workout) => workout.Workout_ID !== workoutId));
    } catch (err) {
      console.error("Error deleting workout:", err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8100/workouts?userId=${userId}`)
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
  }, [userId]);

  return (
<div>
    <Navbar />
    <div className="workouts-container">
      <h1>Your Workouts</h1>
      <ul>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <div key={workout.Workout_ID} className="workout-box">
              <h3>{workout.Workout_Title}</h3>
              <p>{workout.Description}</p>
              <p>{new Date(workout.Datetime).toLocaleString()}</p>
              <p>Volume: {workout.totalVolume !== null ? `${workout.totalVolume} kg` : "Calculating..."}</p>

              {/* Loop through exercises and display them in the format "{n} sets of {exerciseName}" */}
              {workout.exercises && workout.exercises.length > 0 ? (
                <ul className="exercise-list">
                  {workout.exercises.map((exercise, index) => (
                    <li key={index}>
                      {exercise.sets} sets of {exercise.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No exercises found for this workout.</p>
              )}

              {/* Delete button */}
              <button className="delete" onClick={() => handleDelete(workout.Workout_ID)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </ul>
      <button className="add-new-workout-button">
        <Link to={"/new-workout"}>Add New Workout</Link>
      </button>
    </div>
  </div>
  );
};

export default Workouts;
