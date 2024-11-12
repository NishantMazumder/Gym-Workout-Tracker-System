// // src/pages/Login.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import './Login.css';

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("http://localhost:8101/login", {
// //         Username: username,
// //         Password: password,
// //       });
// //       if (res.data.message === "Login successful") {
// //         navigate("/"); // Redirect to events page
// //       }
// //     } catch (err) {
// //       setError("Invalid username or password");
// //     }
// //   };

// const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8101/login", {
//         Username: username,
//         Password: password,
//       });
//       if (res.data.message === "Login successful") {
//         localStorage.setItem("isAuthenticated", true);
//         localStorage.setItem("userRole", res.data.user.Role); // Store user role
//         navigate("/"); // Redirect to events page
//       }
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };
  

//   return (
//     <div class="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

//src/pages/Login.js


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'; // Importing the CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8100/login", {
        Username: username,
        Password: password,
      });
      if (res.data.message === "Login successful") {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userRole", res.data.user.Role);
        localStorage.setItem("userId",res.data.user.User_ID) // Store user role
        navigate("/events"); // Redirect to events page
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

