import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Events.css'; // Import the CSS file
import Navbar from '../components/Navbar';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId"); // Assuming user ID is stored in localStorage

  useEffect(() => {
    // Fetch all events when component mounts
    const fetchAllEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8100/events");
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          console.error("Events data is not an array:", res.data);
        }
      } catch (err) {
        console.log("Error fetching events:", err);
      }
    };
    fetchAllEvents();
  }, []);

  // Handle event deletion (Admin only)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8100/events/${id}`);
      setEvents(events.filter((event) => event.Event_ID !== id)); // Update local state
    } catch (err) {
      console.log("Error deleting event:", err);
    }
  };

  // Handle user participation in an event
  // const handleParticipate = async (eventId) => {
  //   if (!userId) {
  //     alert("Please log in to participate.");
  //     return;
  //   }
  //   try {
  //     await axios.post("http://localhost:8100/participate", { User_ID: userId, Event_ID: eventId });
  //     alert("You have successfully registered for the event!");
  //   } catch (err) {
  //     console.error("Error during participation:", err);
  //     alert("Error: You may already be registered for this event.");
  //   }
  // };

  // const handleParticipate = async (eventId) => {
  //   //const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  //   if (!userId) {
  //     alert("Please log in to participate.");
  //     return;
  //   }
  
  //   try {
  //     await axios.post("http://localhost:8100/participate", { User_ID: userId, Event_ID: eventId });
  //     alert("You have successfully registered for the event!");
  //   } catch (err) {
  //     console.error("Error during participation:", err);
  //     alert("Error: You may already be registered for this event.");
  //   }
  // };
  

  const handleParticipate = async (eventId) => {
    if (! userId) {
      alert("You need to be logged in to participate!");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8100/participate", {
        User_ID: localStorage.getItem("userId"),
        Event_ID: eventId,
      });
      alert(response.data.message);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // Trigger error message for max participants
      } else {
        console.error(err);
        alert("You may already be registered for this event.");
      }
    }
  };
  

  // Fetch participants for a specific event (Admin only)
  const fetchParticipants = async (eventId) => {
    try {
      const res = await axios.get(`http://localhost:8100/participants/${eventId}`);
      setParticipants(res.data);
      setShowParticipants(true);
    } catch (err) {
      console.error("Error fetching participants:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Events Available</h1>
      <div className="events">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.Event_ID} className="event">
              <h2>{event.Event_Name}</h2>
              <p>Type: {event.Event_Type}</p>
              <p>Description: {event.Event_Description}</p>
              <p>Date: {new Date(event.Event_Schedule).toLocaleString()}</p>
              <p>Location: {event.Event_Location}</p>

              {/* User participation button */}
              {userRole !== "admin" && (
                <button className="participate" onClick={() => handleParticipate(event.Event_ID)}>
                  Participate
                </button>
              )}

              {/* Admin-only buttons */}
              {userRole === "admin" && (
                <>
                  <button className="update">
                    <Link to={`/update/${event.Event_ID}`} style={{ color: "inherit", textDecoration: "none" }}>
                      Update
                    </Link>
                  </button>
                  <button className="delete" onClick={() => handleDelete(event.Event_ID)}>Delete</button>
                  <button className="show-participants" onClick={() => fetchParticipants(event.Event_ID)}>
                    Show Participants
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>Loading events...</p>
        )}
      </div>

      {/* Admin-only button to add a new event */}
      {userRole === "admin" && (
        <button className="addHome">
          <Link to="/New_Events" style={{ color: "inherit", textDecoration: "none" }}>
            Add new event
          </Link>
        </button>
      )}

      {/* Display participant list if admin clicks "Show Participants" */}
      {showParticipants && (
        <div className="participants">
          <h3>Participants List</h3>
          <ul>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <li key={participant.User_ID}>{participant.Username} - {participant.Email}</li>
              ))
            ) : (
              <p>No participants found for this event.</p>
            )}
          </ul>
          <button onClick={() => setShowParticipants(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Events;