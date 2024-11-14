import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Profile.css';  // Import the CSS file

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8100/users/${userId}`);
      setUserInfo(response.data);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("Could not fetch user info.");
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  return (
    <div className="profile">
      <Navbar />
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      <div className="user-info">
        <p><strong>Name:</strong> {userInfo.Username}</p>
        <p><strong>Email:</strong> {userInfo.Email}</p>
        <p><strong>Number of Workouts:</strong> {userInfo.WorkoutCount}</p>
        <h3>Workouts:</h3>
        <ul>
          {userInfo.WorkoutNames && userInfo.WorkoutNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;