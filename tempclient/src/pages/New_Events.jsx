
    import axios from "axios";
    import React, { useState } from "react";
    import { useNavigate, Link } from "react-router-dom";
    
    const New_event = () => {
      const [event, setEvent] = useState({
        Event_Name: "",
        Event_Type: "",
        Event_Description: "",
        Event_Schedule: "", // Set a default date value
        Event_Location: "",
      });
      const [error, setError] = useState(false);
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleClick = async (e) => {
        e.preventDefault();
      
        // Format Event_Schedule to YYYY-MM-DD
        const formattedEventSchedule = event.Event_Schedule.split("T")[0]; // Get just the date part
      
        const eventWithTime = {
          ...event,
          Event_Schedule: formattedEventSchedule, // Only send the date part
        };
      
        try {
          const res = await axios.post("http://localhost:8100/events", eventWithTime);
          console.log("New event response:", res.data);
          if (res.data) {
            navigate("/");
          } else {
            console.error("Error creating event:", res.data);
            setError(true);
          }
        } catch (err) {
          console.error("Error creating event:", err);
          setError(true);
        }
      };
      
      
    
      
      return (
        <div className="form">
          <h1>Add New Event</h1>
          <input
            type="text"
            placeholder="Event Name"
            name="Event_Name"
            onChange={handleChange}
            value={event.Event_Name}
          />
          <input
            type="text"
            placeholder="Event type"
            name="Event_Type"
            onChange={handleChange}
            value={event.Event_Type}
          />
          <textarea
            rows={5}
            type="text"
            placeholder="Event Description"
            name="Event_Description"
            onChange={handleChange}
            value={event.Event_Description}
          />
          <input
            type="date"
            placeholder="Event Schedule"
            name="Event_Schedule"
            onChange={handleChange}
            value={event.Event_Schedule}
          />
          <input
            type="text"
            placeholder="Event Location"
            name="Event_Location"
            onChange={handleChange}
            value={event.Event_Location}
          />
          <button onClick={handleClick}>Add</button>
          {error && "Something went wrong!"}
          {<Link to="/">See all events</Link>}
        </div>
      );
    };
    
    export default New_event;