import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');  // replace with actual user ID (e.g., from context or session)

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8100/users/${userId}`);
      console.log(response)
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
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      <div className="user-info">
        <p><strong>Name:</strong> {userInfo.Username}</p>
        <p><strong>Email:</strong> {userInfo.Email}</p>
        {/* Add other user info fields as necessary */}
      </div>
    </div>
  );
};

export default Profile;