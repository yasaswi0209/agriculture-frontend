import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// 🔥 Add Base URL here (change only once)
const BASE_URL = "http://localhost:8080";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (username, email, password) => {
    const signupUrl = `${BASE_URL}/auth/signup`;

    const response = await fetch(signupUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Signup failed");
    }

    return response.text();
  };

  const handleSignup = async () => {
    try {
      await signup(username, email, password);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Signup failed!");
    }
  };

  return (
    <>
      <style>{`
        body {
          min-height: 100vh;
          min-width:100vh;
          background: linear-gradient(#051f30, #000000);
        }
        .signup-bg {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(#051f30, #000000);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .auth-container {
          background: #fff;
          border-radius: 16px;
          padding: 40px 32px 28px 32px;
          max-width: 350px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .auth-container h2 {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #222;
          letter-spacing: 0.03em;
        }
        .auth-container input[type="text"],
        .auth-container input[type="email"],
        .auth-container input[type="password"] {
          font-size: 1rem;
          margin: 0.5rem 0;
          padding: 12px 14px;
          border-radius: 7px;
          border: 1.5px solid #dedede;
          background: #f7fafd;
          color: #23282d;
          outline: none;
          transition: border 0.2s;
        }
        .auth-container input:focus {
          border: 1.5px solid #2b5876;
        }
        .auth-container button {
          margin-top: 1.3rem;
          padding: 12px 0;
          font-size: 1.18rem;
          font-weight: bold;
          border: none;
          border-radius: 7px;
          background: linear-gradient(90deg, #2b5876 0%, #4e4376 100%);
          color: #fff;
          cursor: pointer;
          transition: background 0.18s;
        }
        .auth-container button:hover {
          background: linear-gradient(90deg, #222 0%, #2b5876 100%);
        }
        .auth-container p {
          margin: 18px 0 0 0;
          text-align: center;
          color: #888;
          font-size: 1rem;
        }
        .auth-container a {
          color: #3366ee;
          font-weight: bold;
          text-decoration: none;
        }
        .auth-container a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="signup-bg">
        <div className="auth-container">
          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSignup}>Sign Up</button>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
