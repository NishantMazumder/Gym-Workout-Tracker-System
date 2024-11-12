import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nishantpes367",
  database: "dbms2",
});

// Test Route
app.get("/", (req, res) => {
  res.json("hello");
});

// GET all events
app.get("/events", (req, res) => {
  const q = "SELECT * FROM events";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

// POST a new event
app.post("/events", (req, res) => {
  const q = "INSERT INTO events(`Event_Name`, `Event_Type`, `Event_Description`, `Event_Schedule`, `Event_Location`) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.Event_Name,
    req.body.Event_Type,
    req.body.Event_Description,
    req.body.Event_Schedule,
    req.body.Event_Location,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const q = "SELECT * FROM events WHERE Event_ID = ?"; // Assuming Event_ID is the primary key
  db.query(q, [eventId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Event not found" });
    return res.json(data[0]);
  });
});

// DELETE an event by ID
app.delete("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const q = "DELETE FROM events WHERE Event_ID = ?";
  db.query(q, [eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json({ message: "Event deleted successfully" });
  });
});

// UPDATE an event by ID
app.put("/events/:id", (req, res) => {
  const eventId = req.params.id;
  const q = "UPDATE events SET `Event_Name`= ?, `Event_Type`= ?, `Event_Description`= ?, `Event_Schedule`= ?, `Event_Location`= ? WHERE Event_ID = ?";
  const values = [
    req.body.Event_Name,
    req.body.Event_Type,
    req.body.Event_Description,
    req.body.Event_Schedule,
    req.body.Event_Location,
  ];

  db.query(q, [...values, eventId], (err, data) => {
    if (err) return res.send(err);
    return res.json({ message: "Event updated successfully" });
  });
});

// POST login
// app.post("/login", (req, res) => {
//   const { Username, Password } = req.body;
//   const q = "SELECT * FROM user WHERE Username = ? AND Password = ?";
//   db.query(q, [Username, Password], (err, data) => {
//     if (err) return res.status(500).json(err);
//     if (data.length === 0) {
//       return res.status(401).json({ message: "Invalid username or password" });
//     }
//     return res.json({ message: "Login successful", user: data[0] });
//   });
// });

app.post("/login", (req, res) => {
  const { Username, Password } = req.body;
  const q = "SELECT * FROM user WHERE Username = ? AND Password = ?";
  db.query(q, [Username, Password], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    // Include the user's role in the response
    return res.json({ message: "Login successful", user: data[0] });
  });
});



// Get all workouts for the logged-in user
// app.get("/workouts", (req, res) => {
//   const userId = req.query.userId; // Assuming the userId is passed in the query string
//   const q = "SELECT * FROM workout WHERE User_ID = ?";
  
//   db.query(q, [userId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
  
//   const volume_query = `DELIMITER //
// CREATE FUNCTION CalculateVolume(workoutId INT)
// RETURNS INT
// DETERMINISTIC
// BEGIN
//     DECLARE totalVolume INT;
    
//     SELECT SUM(Reps * Weight) INTO totalVolume
//     FROM Sets
//     JOIN Exercise ON Sets.Exercise_ID = Exercise.Exercise_ID
//     WHERE Exercise.Workout_ID = workoutId AND Sets.Weight IS NOT NULL AND Sets.Reps IS NOT NULL;
    
//     RETURN totalVolume;
// END //
// DELIMITER ;
// `;
  
//   db.query(volume_query, [userId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });


// app.get("/workouts", (req, res) => {
//   const userId = req.query.userId;
//   const workoutQuery = "SELECT * FROM workout WHERE User_ID = ?";

//   db.query(workoutQuery, [userId], (err, workouts) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }

//     // Calculate the volume for each workout
//     const volumePromises = workouts.map((workout) => {
//       return new Promise((resolve, reject) => {
//         const volumeQuery = `
//           SELECT SUM(Sets.Reps * Sets.Weight) AS totalVolume
//           FROM Sets
//           JOIN Exercise ON Sets.Exercise_ID = Exercise.Exercise_ID
//           WHERE Exercise.Workout_ID = ? AND Sets.Weight IS NOT NULL AND Sets.Reps IS NOT NULL
//         `;
        
//         db.query(volumeQuery, [workout.Workout_ID], (err, result) => {
//           if (err) return reject(err);
          
//           workout.totalVolume = result[0].totalVolume || 0; // Add totalVolume to workout
//           resolve(workout);
//         });
//       });
//     });

//     // Wait for all volume calculations to complete
//     Promise.all(volumePromises)
//       .then((workoutsWithVolume) => {
//         res.json(workoutsWithVolume);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.json(err);
//       });
//   });
// }); 

//legitttt  above one
// app.get("/workouts", (req, res) => {
//   const userId = req.query.userId;
//   const workoutQuery = "SELECT * FROM workout WHERE User_ID = ?";

//   // Fetch workouts first
//   db.query(workoutQuery, [userId], (err, workouts) => {
//     if (err) {
//       console.error("Error fetching workouts:", err);
//       return res.status(500).json({ error: "Error fetching workouts" });
//     }

//     // If no workouts found, send an empty array
//     if (workouts.length === 0) {
//       return res.json([]);
//     }

//     // Call the stored procedure for each workout to get totalVolume
//     const volumePromises = workouts.map((workout) => {
//       return new Promise((resolve, reject) => {
//         // Run the procedure and get total volume
//         db.query("CALL CalculateVolume(?);", [workout.Workout_ID], (err, results) => {
//           if (err) return reject(err);

//           // Get the totalVolume from the first result set (from the stored procedure output)
//           const totalVolume = results[0][0]?.totalVolume || 0;
//           workout.totalVolume = totalVolume; // Attach to the workout object
//           resolve(workout);
//         });
//       });
//     });

//     // Wait for all volume calculations to complete
//     Promise.all(volumePromises)
//       .then((workoutsWithVolume) => {
//         res.json(workoutsWithVolume);
//       })
//       .catch((err) => {
//         console.error("Error calculating volumes:", err);
//         res.status(500).json({ error: "Error calculating workout volumes" });
//       });
//   });
// });





// app.get("/workouts", (req, res) => {
//   const userId = req.query.userId; // Assuming the userId is passed in the query string

//   // Query to get workouts along with exercises and the number of sets for each exercise
//   const q = `
//     SELECT 
//       w.Workout_ID, 
//       w.Workout_Title, 
//       w.Description, 
//       w.Datetime, 
//       e.Exercise_ID, 
//       e.Exercise_Name, 
//       COUNT(s.Set_ID) AS Sets,
//       SUM(s.Reps * s.Weight) AS Total_Volume
//     FROM workout w
//     LEFT JOIN exercise e ON e.Workout_ID = w.Workout_ID
//     LEFT JOIN sets s ON s.Exercise_ID = e.Exercise_ID
//     WHERE w.User_ID = ?
//     GROUP BY e.Exercise_ID
//     ORDER BY w.Datetime DESC
//   `;

//   db.query(q, [userId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }

//     // Organize the results so each workout has its associated exercises
//     const workouts = data.reduce((acc, row) => {
//       let workout = acc.find(w => w.Workout_ID === row.Workout_ID);
//       if (!workout) {
//         workout = {
//           Workout_ID: row.Workout_ID,
//           Workout_Title: row.Workout_Title,
//           Description: row.Description,
//           Datetime: row.Datetime,
//           exercises: []
//         };
//         acc.push(workout);
//       }
      
//       workout.exercises.push({
//         Exercise_ID: row.Exercise_ID,
//         Exercise_Name: row.Exercise_Name,
//         Sets: row.Sets,
//         Total_Volume: row.Total_Volume
//       });
      
//       return acc;
//     }, []);

//     return res.json(workouts);
//   });
// });

// Post a new workout
app.post("/workout", (req, res) => {
  const q = "INSERT INTO workout(`Workout_ID`, `Workout_Title`, `Description`, `Datetime`, `User_ID`) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.Workout_ID,
    req.body.Workout_Title,
    req.body.Description,
    req.body.Datetime,
    req.body.User_ID,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});



// Delete a workout by ID
// app.delete("/workouts/:id", (req, res) => {
//   const workoutId = req.params.id;
//   const q1 = "DELETE FROM sets WHERE Workout_ID = ?";
//   const q2 = "DELETE FROM exercise WHERE Workout_ID = ?";
//   const q3 = "DELETE FROM workout WHERE Workout_ID = ?";
//   db.query(q1, [workoutId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json({ message: "Workout deleted successfully" });
//   });
  
//   db.query(q2, [workoutId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json({ message: "Workout deleted successfully" });
//   });

//   db.query(q3, [workoutId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.json({ message: "Workout deleted successfully" });
//   });
// });


app.delete("/workouts/:id", (req, res) => {
  const workoutId = req.params.id;
  const q1 = "DELETE FROM sets WHERE Workout_ID = ?";
  const q2 = "DELETE FROM exercise WHERE Workout_ID = ?";
  const q3 = "DELETE FROM workout WHERE Workout_ID = ?";

  db.query(q1, [workoutId], (err) => {
    if (err) return res.status(500).json(err);

    db.query(q2, [workoutId], (err) => {
      if (err) return res.status(500).json(err);

      db.query(q3, [workoutId], (err) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "Workout and related data deleted successfully" });
      });
    });
  });
});



// Get a specific workout by ID
app.get("/workouts/:id", (req, res) => {
  const workoutId = req.params.id;
  const q = "SELECT * FROM workout WHERE Workout_ID = ?";
  db.query(q, [workoutId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Workout not found" });
    return res.json(data[0]);
  });
});

// POST a new exercise
// app.post("/exercise", (req, res) => {
//   const q = "INSERT INTO exercise(`Exercise_Name`, `Note`, `Exercise_Type`, `Workout_ID`) VALUES (?, ?, ?, ?)";
  
//   const values = [
//     req.body.Exercise_Name,
//     req.body.Note,
//     req.body.Exercise_Type,
//     req.body.Workout_ID,
//   ];

//   db.query(q, values, (err, data) => {
//     if (err) return res.status(500).json({ message: "Error adding exercise", error: err });
//     return res.status(201).json({ message: "Exercise added successfully", data });
//   });
// });


// POST a new exercise
app.post("/exercise", (req, res) => {

  const q = "INSERT INTO exercise(`Exercise_ID`, `Exercise_Name`, `Note`, `Exercise_Type`, `Workout_ID`) VALUES (?, ?, ?, ?, ?)";
  
  const values = [
    req.body.Exercise_ID,  // Use the generated UUID as the Exercise_ID
    req.body.Exercise_Name,
    req.body.Note,
    req.body.Exercise_Type,
    req.body.Workout_ID,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ message: "Error adding exercise", error: err });
    return res.status(201).json({ message: "Exercise added successfully", data });
  });
});



//POST a set for an exercise
app.post("/sets", (req, res) => {
  const q = "INSERT INTO sets(`Reps`, `Weight`, `Time`, `Distance`, `Exercise_ID`, `Workout_ID`) VALUES (?, ?, ?, ?, ?, ?)";
  
  const values = [
    req.body.Reps || 0, // Default to 0 if Reps is not provided
    req.body.Weight || 0, // Default to 0 if Weight is not provided
    req.body.Time || 0, // Default to 0 if Time is not provided
    req.body.Distance || 0, // Default to 0 if Distance is not provided
    req.body.Exercise_ID,
    req.body.Workout_ID,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json({ message: "Error adding exercise", error: err });
    return res.status(201).json({ message: "Exercise added successfully", data });
  });
});


// POST route for user participation
// app.post("/participates", (req, res) => {
//   const { User_ID, Event_ID } = req.body;

//   const checkQuery = "SELECT * FROM participates WHERE User_ID = ? AND Event_ID = ?";
//   db.query(checkQuery, [User_ID, Event_ID], (err, result) => {
//     if (err) return res.status(500).json(err);
    
//     if (result.length > 0) {
//       return res.status(400).json({ message: "User is already registered for this event." });
//     }

//     const insertQuery = "INSERT INTO participates (User_ID, Event_ID) VALUES (?, ?)";
//     db.query(insertQuery, [User_ID, Event_ID], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.json({ message: "Participation successful" });
//     });
//   });
// });

// GET route to fetch participants for a specific event
app.get("/participants/:eventId", (req, res) => {
  const eventId = req.params.eventId;

  const query = `
    SELECT User.User_ID, User.Username, User.Email
    FROM participates
    JOIN User ON participates.User_ID = User.User_ID
    WHERE participates.Event_ID = ?
  `;
  db.query(query, [eventId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});


//------------------------------

app.post("/participate", (req, res) => {
  const { User_ID, Event_ID } = req.body;

  const insertQuery = "INSERT INTO Participates (User_ID, Event_ID) VALUES (?, ?)";
  db.query(insertQuery, [User_ID, Event_ID], (err, data) => {
    if (err) {
      // Catch trigger error for participant limit
      if (err.code === 'ER_SIGNAL_EXCEPTION') {
        return res.status(400).json({ message: "Cannot add participant: Event already has maximum participants." });
      }
      return res.status(500).json(err);
    }
    return res.json({ message: "Participation successful" });
  });
});

// GET route to fetch participants for a specific event
app.get("/participants/:eventId", (req, res) => {
  const eventId = req.params.eventId;

  const query = `
    SELECT User.User_ID, User.Username, User.Email
    FROM participates
    JOIN User ON participates.User_ID = User.User_ID
    WHERE participates.Event_ID = ?
  `;
  db.query(query, [eventId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});


// GET user profile information by User ID
app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = "SELECT User_ID, Username, Email FROM User WHERE User_ID = ?";
  
  db.query(query, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "User not found" });
    return res.json(data[0]);
  });
});


app.listen(8100, () => {
  console.log("Connected to backend.");
});
