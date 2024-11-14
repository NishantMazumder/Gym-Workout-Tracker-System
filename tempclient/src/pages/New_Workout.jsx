// import React, { useState } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';
// import Navbar from '../components/Navbar';


// function New_Workout({ userId }) {
//   const [workoutTitle, setWorkoutTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [datetime, setDatetime] = useState("");
//   const [exercises, setExercises] = useState([]);
//   const [workoutImage, setWorkoutImage] = useState(null);
  
//   const addExercise = () => {
//     setExercises([...exercises, { name: "", type: "", sets: [{ reps: "", weight: "", time: "", distance: "" }] }]);
//   };
  
//   const handleExerciseChange = (index, field, value) => {
//     const updatedExercises = [...exercises];
//     updatedExercises[index][field] = value;
//     setExercises(updatedExercises);
//   };

//   const addSet = (exerciseIndex) => {
//     const updatedExercises = [...exercises];
//     updatedExercises[exerciseIndex].sets.push({ reps: "", weight: "", time: "", distance: "" });
//     setExercises(updatedExercises);
//   };

//   const handleSetChange = (exerciseIndex, setIndex, field, value) => {
//     const updatedExercises = [...exercises];
//     updatedExercises[exerciseIndex].sets[setIndex][field] = value;
//     setExercises(updatedExercises);
//   };

//   const removeExercise = (index) => {
//     setExercises(exercises.filter((_, i) => i !== index));
//   };

//   const removeSet = (exerciseIndex, setIndex) => {
//     const updatedExercises = [...exercises];
//     updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
//     setExercises(updatedExercises);
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const workoutResponse = await axios.post("http://localhost:8100/workouts", {
//   //       Workout_Title: workoutTitle,
//   //       Description: description,
//   //       Datetime: datetime,
//   //       User_ID: userId,
//   //     });

//   //     const Workout_ID = workoutResponse.data.Workout_ID;

//   //     for (const exercise of exercises) {
//   //       const exerciseResponse = await axios.post("http://localhost:8100/exercise", {
//   //         Exercise_Name: exercise.name,
//   //         Note: exercise.note || "",
//   //         Exercise_Type: exercise.type,
//   //         Workout_ID: Workout_ID,
//   //       });
      
//   //       const Exercise_ID = exerciseResponse.data.Exercise_ID;

//   //       for (const set of exercise.sets) {
//   //         if (exercise.type === "cardio") {
//   //           await axios.post("http://localhost:8100/sets", {
//   //             Time: set.time,
//   //             Distance: set.distance,
//   //             Exercise_ID: Exercise_ID,
//   //             Workout_ID: Workout_ID,
//   //           });
//   //         } else if (["bodyweight", "resistance band"].includes(exercise.type)) {
//   //           await axios.post("http://localhost:8100/sets", {
//   //             Reps: set.reps,
//   //             Exercise_ID: Exercise_ID,
//   //             Workout_ID: Workout_ID,
//   //           });
//   //         } else if (["barbell", "dumbbell", "kettlebell", "plate"].includes(exercise.type)) {
//   //           await axios.post("http://localhost:8100/sets", {
//   //             Reps: set.reps,
//   //             Weight: set.weight,
//   //             Exercise_ID: Exercise_ID,
//   //             Workout_ID: Workout_ID,
//   //           });
//   //         }
//   //       }
//   //     }

//   //     alert("Workout, exercises, and sets added successfully!");
//   //     window.location.href = "/workouts";
//   //   } catch (error) {
//   //     console.error("Error adding workout, exercises, or sets:", error);
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Exercises:', exercises); // Check if data exists
  
//     try {
//       const Workout_ID = uuidv4();
//       console.log(Workout_ID)
      
//       // First, create the workout
//       const workoutResponse = await axios.post("http://localhost:8100/workout", {
//         Workout_ID: Workout_ID,
//         Workout_Title: workoutTitle,
//         Description: description,
//         Datetime: datetime,
//         User_ID: userId,
//     });
//     console.log("Workout added:", workoutResponse.data);



//       // Now, send all exercises and sets
//       for (const exercise of exercises) {
//         const Exercise_ID = uuidv4();

//         console.log('Sending exercise:', exercise); // Log each exercise
//         const exerciseResponse = await axios.post("http://localhost:8100/exercise", {
//             Exercise_ID: Exercise_ID,
//             Exercise_Name: exercise.name,
//             Note: exercise.note || "",
//             Exercise_Type: exercise.type,
//             Workout_ID: Workout_ID,  // Ensure this is included
//         });
//         const ExerciseID = exerciseResponse.data.Exercise_ID;
    
//         for (const set of exercise.sets) {
//             console.log('Sending set:', set); // Log each set
//             if (exercise.type === "cardio") {
//                 await axios.post("http://localhost:8100/sets", {
//                     Time: set.time,
//                     Distance: set.distance,
//                     Exercise_ID: Exercise_ID,
//                     Workout_ID: Workout_ID,  // Include Workout_ID in sets
//                 });
//             } else if (["bodyweight", "resistance band"].includes(exercise.type)) {
//                 await axios.post("http://localhost:8100/sets", {
//                     Reps: set.reps,
//                     Exercise_ID: Exercise_ID,
//                     Workout_ID: Workout_ID,  // Include Workout_ID in sets
//                 });
//             } else if (["barbell", "dumbbell", "kettlebell", "plate"].includes(exercise.type)) {
//                 await axios.post("http://localhost:8100/sets", {
//                     Reps: set.reps,
//                     Weight: set.weight,
//                     Exercise_ID: Exercise_ID,
//                     Workout_ID: Workout_ID,  // Include Workout_ID in sets
//                 });
//             }
//         }
//     }
  
//       alert("Workout, exercises, and sets added successfully!");
//       window.location.href = "/workouts"; // Redirect after successful submission
//     } catch (error) {
//       console.error("Error adding workout, exercises, or sets:", error);
//       alert("Error adding workout. Please try again.");
//     }
//   };


//   return (
//     <div>
//       <Navbar />
//       <h1>Add New Workout</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Workout Title</label>
//           <input
//             type="text"
//             value={workoutTitle}
//             onChange={(e) => setWorkoutTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label>Datetime</label>
//           <input
//             type="datetime-local"
//             value={datetime}
//             onChange={(e) => setDatetime(e.target.value)}
//             required
//           />
//         </div>

//         {/* New file input for image */}
//         {/* <div>
//           <label>Upload Workout Image</label>
//           <input
//             type="file"
//             onChange={(e) => setWorkoutImage(e.target.files[0])}
//             accept="image/*"
//           />
//         </div> */}


//         <div>
//           <h2>Exercises</h2>
//           {exercises.map((exercise, exerciseIndex) => (
//             <div key={exerciseIndex} style={{ marginBottom: "1em", border: "1px solid #ccc", backgroundColor: "#D3D3D3", padding: "10px" }}>
//               <label>Exercise Name</label>
//               <input
//                 type="text"
//                 value={exercise.name}
//                 onChange={(e) => handleExerciseChange(exerciseIndex, "name", e.target.value)}
//                 required
//               />

//               <label>Note</label>
//               <input type="text" onChange={(e) => handleExerciseChange(exerciseIndex, "note", e.target.value)} />

//               <label>Exercise Type</label>
//               <select
//                 value={exercise.type}
//                 onChange={(e) => handleExerciseChange(exerciseIndex, "type", e.target.value)}
//                 required
//               >
//                 <option value="">Select Type</option>
//                 <option value="bodyweight">bodyweight</option>
//                 <option value="cardio">cardio</option>
//                 <option value="barbell">barbell</option>
//                 <option value="dumbbell">dumbbell</option>
//                 <option value="kettlebell">kettlebell</option>
//                 <option value="machine">machine</option>
//                 <option value="plate">plate</option>
//                 <option value="resistance band">resistance band</option>
//               </select>

//               <button type="button" onClick={() => removeExercise(exerciseIndex)} style={{ backgroundColor: "red", color: "white" }}>Remove Exercise</button>

//               <h3>Sets</h3>
//               {exercise.sets.map((set, setIndex) => (
//                 <div key={setIndex} style={{ marginBottom: "0.5em" }}>
//                   {exercise.type === "cardio" && (
//                     <>
//                       <label>Time (minutes)</label>
//                       <input
//                         type="number"
//                         value={set.time}
//                         onChange={(e) => handleSetChange(exerciseIndex, setIndex, "time", e.target.value)}
//                       />
//                       <label>Distance (km)</label>
//                       <input
//                         type="number"
//                         value={set.distance}
//                         onChange={(e) => handleSetChange(exerciseIndex, setIndex, "distance", e.target.value)}
//                       />
//                     </>
//                   )}

//                   {exercise.type !== "cardio" && (
//                     <>
//                       <label>Reps</label>
//                       <input
//                         type="number"
//                         value={set.reps}
//                         onChange={(e) => handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)}
//                         required
//                       />
//                       {(exercise.type === "barbell" || exercise.type === "dumbbell" || exercise.type === "kettlebell" || exercise.type === "machine" || exercise.type === "plate") && (
//                         <>
//                           <label>Weight (kg)</label>
//                           <input
//                             type="number"
//                             value={set.weight}
//                             onChange={(e) => handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)}
//                           />
//                         </>
//                       )}
//                     </>
//                   )}
//                   <button type="button" onClick={() => removeSet(exerciseIndex, setIndex)}>Remove Set</button>
//                 </div>
//               ))}
//               <button type="button" onClick={() => addSet(exerciseIndex)}>Add Set</button>
//             </div>
//           ))}
//           <button type="button" onClick={addExercise} style={{ backgroundColor: "blue", color: "white" }}>Add Exercise</button>
//         </div>

//         <button onClick={handleSubmit} type="submit" style={{ backgroundColor: "green", color: "white" }}>Add Workout</button>
//       </form>
//     </div>
//   );
// }

// export default New_Workout;


import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../components/Navbar';

function New_Workout({ userId }) {
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  const [exercises, setExercises] = useState([]);
  const [workoutImage, setWorkoutImage] = useState(null);

  const addExercise = () => {
    setExercises([...exercises, { name: "", type: "", sets: [{ reps: "", weight: "", time: "", distance: "" }] }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const addSet = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.push({ reps: "", weight: "", time: "", distance: "" });
    setExercises(updatedExercises);
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(updatedExercises);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    setExercises(updatedExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Workout_ID = uuidv4();
      await axios.post("http://localhost:8100/workout", {
        Workout_ID: Workout_ID,
        Workout_Title: workoutTitle,
        Description: description,
        Datetime: datetime,
        User_ID: userId,
      });

      for (const exercise of exercises) {
        const Exercise_ID = uuidv4();
        await axios.post("http://localhost:8100/exercise", {
          Exercise_ID: Exercise_ID,
          Exercise_Name: exercise.name,
          Note: exercise.note || "",
          Exercise_Type: exercise.type,
          Workout_ID: Workout_ID,
        });

        for (const set of exercise.sets) {
          const setData = { Exercise_ID, Workout_ID };
          if (exercise.type === "cardio") {
            setData.Time = set.time;
            setData.Distance = set.distance;
          } else if (["bodyweight", "resistance band"].includes(exercise.type)) {
            setData.Reps = set.reps;
          } else {
            setData.Reps = set.reps;
            setData.Weight = set.weight;
          }
          await axios.post("http://localhost:8100/sets", setData);
        }
      }

      alert("Workout, exercises, and sets added successfully!");
      window.location.href = "/workouts";
    } catch (error) {
      console.error("Error adding workout, exercises, or sets:", error);
      alert("Error adding workout. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Add New Workout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Workout Title</label>
          <input
            type="text"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Datetime</label>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
        </div>

        <div>
          <h2>Exercises</h2>
          {exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} style={{ marginBottom: "1em", border: "1px solid #ccc", backgroundColor: "#D3D3D3", padding: "10px" }}>
              <label>Exercise Name</label>
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(exerciseIndex, "name", e.target.value)}
                required
              />
              <label>Note</label>
              <input type="text" onChange={(e) => handleExerciseChange(exerciseIndex, "note", e.target.value)} />
              <label>Exercise Type</label>
              <select
                value={exercise.type}
                onChange={(e) => handleExerciseChange(exerciseIndex, "type", e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="bodyweight">bodyweight</option>
                <option value="cardio">cardio</option>
                <option value="barbell">barbell</option>
                <option value="dumbbell">dumbbell</option>
                <option value="kettlebell">kettlebell</option>
                <option value="machine">machine</option>
                <option value="plate">plate</option>
                <option value="resistance band">resistance band</option>
              </select>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => removeExercise(exerciseIndex)}
                  style={{ width: "200px", backgroundColor: "red", color: "white", margin: "10px" }}
                >
                  Remove Exercise
                </button>
              </div>

              <h3>Sets</h3>
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} style={{ marginBottom: "0.5em" }}>
                  {exercise.type === "cardio" && (
                    <>
                      <label>Time (minutes)</label>
                      <input
                        type="number"
                        value={set.time}
                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "time", e.target.value)}
                      />
                      <label>Distance (km)</label>
                      <input
                        type="number"
                        value={set.distance}
                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "distance", e.target.value)}
                      />
                    </>
                  )}

                  {exercise.type !== "cardio" && (
                    <>
                      <label>Reps</label>
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)}
                        required
                      />
                      {(exercise.type === "barbell" || exercise.type === "dumbbell" || exercise.type === "kettlebell" || exercise.type === "machine" || exercise.type === "plate") && (
                        <>
                          <label>Weight (kg)</label>
                          <input
                            type="number"
                            value={set.weight}
                            onChange={(e) => handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)}
                          />
                        </>
                      )}
                    </>
                  )}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      type="button"
                      onClick={() => removeSet(exerciseIndex, setIndex)}
                      style={{ width: "200px", backgroundColor: "red", color: "white", margin: "5px" }}
                    >
                      Remove Set
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="button"
                  onClick={() => addSet(exerciseIndex)}
                  style={{ width: "200px", backgroundColor: "blue", color: "white", margin: "10px" }}
                >
                  Add Set
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="button"
              onClick={addExercise}
              style={{ width: "200px", backgroundColor: "blue", color: "white", margin: "10px" }}
            >
              Add Exercise
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleSubmit}
            type="submit"
            style={{ width: "200px", backgroundColor: "green", color: "white", margin: "20px" }}
          >
            Add Workout
          </button>
        </div>
      </form>
    </div>
  );
}

export default New_Workout;

