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
// app.delete("/events/:id", (req, res) => {
//   const eventId = req.params.id;
//   const q = "DELETE FROM events WHERE Event_ID = ?";
//   db.query(q, [eventId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json({ message: "Event deleted successfully" });
//   });
// });

// DELETE an event by ID
// DELETE an event by ID
app.delete("/events/:id", async (req, res) => {
  const eventId = req.params.id;

  const deleteEventQuery = "DELETE FROM events WHERE Event_ID = ?";
  const deleteParticipatesQuery = "DELETE FROM participates WHERE Event_ID = ?";

  try {
    // First delete from participates table
    await new Promise((resolve, reject) => {
      db.query(deleteParticipatesQuery, [eventId], (err, result) => {
        if (err) {
          reject(err); // Reject if there's an error
        } else {
          resolve(result); // Resolve if successful
        }
      });
    });

    // Then delete from events table
    await new Promise((resolve, reject) => {
      db.query(deleteEventQuery, [eventId], (err, result) => {
        if (err) {
          reject(err); // Reject if there's an error
        } else {
          resolve(result); // Resolve if successful
        }
      });
    });

    // If both queries succeed, send success message
    return res.json({ message: "Event deleted successfully" });

  } catch (err) {
    // If any error occurs during the queries, send error response
    console.error(err);
    return res.status(500).send("Error deleting event");
  }
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


app.get("/workouts", (req, res) => {
  const userId = req.query.userId;

  const workoutQuery = `
    SELECT 
      w.Workout_ID,
      w.Workout_Title,
      w.Description,
      w.Datetime,
      e.Exercise_ID,
      e.Exercise_Name,
      e.Note,
      (SELECT COUNT(s.Set_Number) 
       FROM Sets s 
       WHERE s.Exercise_ID = e.Exercise_ID) AS NumberOfSets
    FROM 
      Workout w
    JOIN 
      Exercise e ON w.Workout_ID = e.Workout_ID
    WHERE 
      w.User_ID = ?
    ORDER BY 
      w.Workout_ID, e.Exercise_ID;
  `;

  db.query(workoutQuery, [userId], (err, workouts) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    // Structure the data to group exercises by Workout_ID
    const groupedWorkouts = workouts.reduce((acc, workout) => {
      const workoutId = workout.Workout_ID;
      if (!acc[workoutId]) {
        acc[workoutId] = {
          ...workout,
          exercises: []
        };
      }
      acc[workoutId].exercises.push({
        name: workout.Exercise_Name,
        note: workout.Note,
        sets: workout.NumberOfSets
      });
      return acc;
    }, {});

    // Convert grouped data back into an array
    const formattedWorkouts = Object.values(groupedWorkouts);

    // Calculate the total volume for each workout
    const volumePromises = formattedWorkouts.map((workout) => {
      return new Promise((resolve, reject) => {
        const volumeQuery = `
          SELECT SUM(s.Reps * s.Weight) AS totalVolume
          FROM Sets s
          JOIN Exercise e ON s.Exercise_ID = e.Exercise_ID
          WHERE e.Workout_ID = ? AND s.Weight IS NOT NULL AND s.Reps IS NOT NULL
        `;

        db.query(volumeQuery, [workout.Workout_ID], (err, result) => {
          if (err) return reject(err);

          // Add the total volume to the workout object
          workout.totalVolume = result[0] && result[0].totalVolume ? result[0].totalVolume : 0;
          resolve(workout);
        });
      });
    });

    // Wait for all volume calculations to complete
    Promise.all(volumePromises)
      .then((workoutsWithVolume) => {
        res.json(workoutsWithVolume);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
});


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

app.get("/users/:userId", (req, res) => {
  const userId = req.params.userId;

  const userQuery = "SELECT User_ID, Username, Email FROM User WHERE User_ID = ?";
  
  db.query(userQuery, [userId], (err, userData) => {
      if (err) return res.status(500).json(err);
      if (userData.length === 0) return res.status(404).json({ message: "User not found" });

      // Call stored procedure to get workout count and names for the user
      const workoutQuery = "CALL GetUserWorkout(?)";
      
      db.query(workoutQuery, [userId], (err, result) => {
          if (err) return res.status(500).json(err);
            // Ensure result contains the expected data
            const workoutCount = result[0][0].WorkoutCount || 0;  // Extract workout count
            const workoutNames = result[1].map((row) => row.Workout_Title) || []; // Extract workout titles

          // // Combine user data and workout details
          const userInfo = {
              ...userData[0],
              WorkoutCount: workoutCount,
              WorkoutNames: workoutNames,
          };
          return res.json(userInfo);
      });
  });
});


app.listen(8100, () => {
  console.log("Connected to backend.");
});
