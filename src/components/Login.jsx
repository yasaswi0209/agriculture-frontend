import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const styles = {
  loginBg: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff"
  },

  loginContainer: {
    background: "#ffffff",
    padding: "2.8rem 2.5rem",
    width: "360px",
    borderRadius: "1rem",
    boxShadow: "0 6px 28px rgba(0,0,0,0.12)",
    border: "1px solid #e6e6e6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  loginTitle: {
    color: "#292929",
    fontSize: "2rem",
    marginBottom: "1.8rem",
    textAlign: "center",
    fontWeight: "600"
  },

  loginForm: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "0.75rem"
  },

  label: {
    color: "#333",
    fontSize: "1rem",
    marginBottom: "0.2rem"
  },

  input: {
    padding: "0.7rem 1rem",
    border: "1px solid #cfcfcf",
    borderRadius: "0.5rem",
    background: "#fafafa",
    color: "#333",
    fontSize: "1rem"
  },

  button: {
    marginTop: "1rem",
    background: "#3b5cff",
    color: "#ffffff",
    border: "none",
    padding: "0.75rem 1.2rem",
    borderRadius: "0.5rem",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "0.25s"
  },

  buttonHover: {
    background: "#243fdd"
  },

  error: {
    color: "#e63946",
    fontSize: "0.95rem",
    marginTop: "0.4rem",
    textAlign: "center"
  },

  signupMsg: {
    marginTop: "1.5rem",
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#444"
  },

  signupLink: {
    color: "#3b5cff",
    textDecoration: "none",
    fontWeight: "600"
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setError("");

      // ----------- CALL LOGIN API -----------
      const response = await login(email, password);

      // ----------- SAVE AUTH DATA -----------
      localStorage.setItem("isAuthenticated", "true");

      // ⭐ SAVE USER ID (IMPORTANT for Orders, Profile, etc.)
      if (response?.data?.id) {
        localStorage.setItem("userId", response.data.id);
      } else if (response?.id) {
        localStorage.setItem("userId", response.id);
      } else {
        console.warn("⚠️ Backend did not return a user ID");
      }

      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch {
      setError("Invalid credentials!");
    }
  };

  return (
    <div style={styles.loginBg}>
      <div style={styles.loginContainer}>
        <h2 style={styles.loginTitle}>Login</h2>

        <form onSubmit={handleLogin} style={styles.loginForm}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
            required
          />

          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
          >
            Login
          </button>
        </form>

        <p style={styles.signupMsg}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
