import React, { useState, useEffect } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  // Apply theme to body
  useEffect(() => {
    document.body.style.background = theme === "dark" ? "#0f172a" : "#f0f8ff";
    document.body.style.color = theme === "dark" ? "white" : "black";
    document.body.style.transition = "0.3s ease";
  }, [theme]);

  const cardStyle = {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: theme === "dark"
      ? "0px 4px 16px rgba(255,255,255,0.1)"
      : "0px 4px 16px rgba(0,0,0,0.15)",
    background: theme === "dark" ? "#1e293b" : "#ffffff",
    color: theme === "dark" ? "white" : "black",
    transition: "0.3s ease",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #888",
    marginTop: "6px",
    fontSize: "16px",
    background: theme === "dark" ? "#334155" : "white",
    color: theme === "dark" ? "white" : "black",
    transition: "0.3s ease",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    marginTop: "30px",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
    background: theme === "dark" ? "#3b82f6" : "#1e3a8a",
    color: "white",
    border: "none",
    transition: "0.3s ease",
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: "center", fontSize: "28px" }}>
        ⚙️ Settings
      </h2>

      {/* Email */}
      <label>Email</label>
      <input
        type="email"
        style={inputStyle}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter new email"
      />

      {/* Phone */}
      <label style={{ marginTop: "20px", display: "block" }}>Phone</label>
      <input
        type="text"
        style={inputStyle}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number"
      />

      {/* Password Change */}
      <h3 style={{ marginTop: "25px" }}>🔐 Change Password</h3>
      <input
        type="password"
        style={inputStyle}
        placeholder="Old Password"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
      />
      <input
        type="password"
        style={inputStyle}
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />

      {/* Theme Switch */}
      <h3 style={{ marginTop: "25px" }}>🎨 Theme</h3>
      <select
        style={inputStyle}
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="light">🌞 Light Mode</option>
        <option value="dark">🌙 Dark Mode</option>
      </select>

      {/* Save Button */}
      <button style={buttonStyle} onClick={() => alert("Settings Saved!")}>
        💾 Save Settings
      </button>
    </div>
  );
};

export default Settings;
