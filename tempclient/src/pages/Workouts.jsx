// import React, { useState, useEffect } from "react";
// import {setEvents} from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";


// const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:8100/workout/${id}`);
//     setEvents(workouts.filter((workout) => workout.Workout_ID !== id)); // Remove event from local state
//   } catch (err) {
//     console.log(err);
//   }
// };


// function Workouts({ userId }) {
//   const [workouts, setWorkouts] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8100/workouts?userId=${userId}`)
//       .then((response) => {
//         setWorkouts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching workouts:", error);
//       });
//   }, [userId]);

//   return (
//     <div>
//       <h1>Your Workouts</h1>
//       <ul>
//         {workouts.map((workout) => (
//           <li key={workout.Workout_ID}>
//             <h3>{workout.Workout_Title}</h3>
//             <p>{workout.Description}</p>
//             <p>{new Date(workout.Datetime).toLocaleString()}</p>
//             <button className="delete" onClick={() => handleDelete(workout.Workout_ID)}>Delete</button>
//                   <button className="update">
//                     <Link to={`/update/${workout.Workout_ID}`} style={{ color: "inherit", textDecoration: "none" }}>
//                       Update
//                     </Link>
//             </button>
//           </li>
//         ))}
//       </ul>
//       <a href="/new-workout">Add New Workout</a>
//     </div>
//   );
// }

// export default Workouts;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Workouts = ({ userId }) => {
//   const [workouts, setWorkouts] = useState([]);


//   const handleDelete = async (workoutId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8100/workouts/${workoutId}`);
//       console.log("Workout deleted:", response.data);
//       setWorkouts(workouts.filter((workout) => workout.Workout_ID !== workoutId));
//     } catch (err) {
//       console.error("Error deleting workout:", err.response ? err.response.data : err.message);
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8100/workouts?userId=${userId}`)
//       .then((response) => {
//         setWorkouts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching workouts:", error);
//       });
//   }, [userId]);

//   return (
//     <div>
//       <h1>Your Workouts</h1>
//       <ul>
//         {workouts.map((workout,exercises) => (
//           <li key={workout.Workout_ID}>
//             <h3>{workout.Workout_Title}</h3>
//             <p>{workout.Description}</p>
//             <p>{new Date(workout.Datetime).toLocaleString()}</p>
            
//             {/* Display total volume in kg */}
//             <p>Volume: {workout.Total_Volume} kg</p>
//             {/* calculate total volume */}
//             {/* Display exercises and sets */}
//             <div>
//               <h4>Exercises:</h4>
//               {workout.exercises && workout.exercises.length > 0 ? (
//                 workout.exercises.map((exercise) => (
//                   <div key={exercise.Exercise_ID}>
//                     <p>{exercise.Sets} sets of {exercise.Exercise_Name}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No exercises found for this workout.</p>
//               )}
//             </div>
  
//             {/* Delete button */}
//             <button className="delete" onClick={() => handleDelete(workout.Workout_ID)}>Delete</button>
  
//           </li>
//         ))}
//       </ul>
//       <button>
//         <a href="/new-workout">Add New Workout</a>
//       </button>
//     </div>
//   );  
// };

// export default Workouts;





// Workouts.jsx

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Workouts = ({ userId }) => {
//   const [workouts, setWorkouts] = useState([]);

//   const handleDelete = async (workoutId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8100/workouts/${workoutId}`);
//       console.log("Workout deleted:", response.data);
//       setWorkouts(workouts.filter((workout) => workout.Workout_ID !== workoutId));
//     } catch (err) {
//       console.error("Error deleting workout:", err.response ? err.response.data : err.message);
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8100/workouts?userId=${userId}`)
//       .then((response) => {
//         setWorkouts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching workouts:", error);
//       });
//   }, [userId]);

//   return (
//     <div>
//       <h1>Your Workouts</h1>
//       <ul>
//         {workouts.map((workout) => (
//           <li key={workout.Workout_ID}>
//             <h3>{workout.Workout_Title}</h3>
//             <p>{workout.Description}</p>
//             <p>{new Date(workout.Datetime).toLocaleString()}</p>

//             {/* Display total volume in kg */}
//             {/* <p>Volume: {workout.exercises.reduce((acc, exercise) => acc + (exercise.Total_Volume || 0), 0)} kg</p> */}
//             <p>Volume: {workout.exercises.reduce((acc, exercise) => acc + (exercise.Total_Volume || 0), 0)} kg</p>

//             {/* Display exercises and sets */}
//             <div>
//               <h4>Exercises:</h4>
//               {workout.exercises && workout.exercises.length > 0 ? (
//                 workout.exercises.map((exercise) => (
//                   <div key={exercise.Exercise_ID}>
//                     <p>{exercise.Exercise_Name}</p>
//                     <p>{exercise.Sets} sets</p>
//                     {/* Optionally, show total volume for the exercise */}
//                     <p>Total Volume: {exercise.Total_Volume} kg</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No exercises found for this workout.</p>
//               )}
//             </div>

//             {/* Delete button */}
//             <button className="delete" onClick={() => handleDelete(workout.Workout_ID)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button>
//         <a href="/new-workout">Add New Workout</a>
//       </button>
//     </div>
//   );
// };

// export default Workouts;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Workouts = ({ userId }) => {
//   const [workouts, setWorkouts] = useState([]);

//   const handleDelete = async (workoutId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8100/workouts/${workoutId}`);
//       setWorkouts(workouts.filter((workout) => workout.Workout_ID !== workoutId));
//     } catch (err) {
//       console.error("Error deleting workout:", err.response ? err.response.data : err.message);
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8100/workouts?userId=${userId}`)
//       .then((response) => {
//         setWorkouts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching workouts:", error);
//       });
//   }, [userId]);

//   return (
//     <div>
//       <h1>Your Workouts</h1>
//       <ul>
//         {workouts.map((workout) => (
//           <li key={workout.Workout_ID}>
//             <h3>{workout.Workout_Title}</h3>
//             <p>{workout.Description}</p>
//             <p>{new Date(workout.Datetime).toLocaleString()}</p>
//             <p>Volume: {workout.totalVolume} kg</p>

//             {/* Delete button */}
//             <button className="delete" onClick={() => handleDelete(workout.Workout_ID)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button>
//         <a href="/new-workout">Add New Workout</a>
//       </button>
//     </div>
//   );
// };

// export default Workouts;


//LEGIT CODEEEEEEEE

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <h1>Your Workouts</h1>
      <ul>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <li key={workout.Workout_ID}>
              <h3>{workout.Workout_Title}</h3>
              <p>{workout.Description}</p>
              <p>{new Date(workout.Datetime).toLocaleString()}</p>
              <p>Volume: {workout.totalVolume !== null ? `${workout.totalVolume} kg` : "Calculating..."}</p>
              <p>Exercises</p>
              
              {/* Delete button */}
              <button className="delete" onClick={() => handleDelete(workout.Workout_ID)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </ul>
      <button>
        {/* <a href="/New_Workout">Add New Workout</a> */}
        <Link to={"/new-workout"}>Add New Workout</Link>
      </button>

    </div>
  );
};

export default Workouts;

