import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    Event_Name: "",
    Event_Type: "",
    Event_Description: "",
    Event_Schedule: "",
    Event_Location: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8100/events/${id}`);
        // Extract the date part from the Event_Schedule
        const eventData = {
          ...res.data,
          Event_Schedule: res.data.Event_Schedule.split("T")[0] // Get just the date part
        };
        setEvent(eventData);
      } catch (err) {
        console.log("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8100/events/${id}`, event);
      navigate("/"); // Redirect back to the events list
    } catch (err) {
      console.log("Error updating event:", err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update Event</h1>
      <input
        type="text"
        placeholder="Event Name"
        name="Event_Name"
        onChange={handleChange}
        value={event.Event_Name}
      />
      <input
        type="text"
        placeholder="Event Type"
        name="Event_Type"
        onChange={handleChange}
        value={event.Event_Type}
      />
      <textarea
        rows={5}
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
      <button onClick={handleUpdate}>Update</button>
      {error && "Something went wrong!"}
    </div>
  );
};

export default Update;



