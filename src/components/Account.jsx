import React, { useState } from "react";

const Account = () => {
  const [profile, setProfile] = useState({
    name: "Yasaswi Navuluru",
    email: "yasaswi@gmail.com",
    phone: "9876543210",
    address: "Vijayawada, Andhra Pradesh",
    profileImage:
      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png", // default avatar
  });

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "40px",
        borderRadius: "20px",
        background: "#ffffff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Profile Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <img
          src={profile.profileImage}
          alt="Profile"
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #4a6cf7",
            marginBottom: "15px",
          }}
        />
        <h2 style={{ fontSize: "28px", margin: "10px 0", color: "#2F3D55" }}>
          {profile.name}
        </h2>
        <p style={{ color: "#555", fontSize: "16px" }}>{profile.email}</p>
      </div>

      <hr style={{ margin: "25px 0", borderColor: "#ddd" }} />

      {/* Details Section */}
      <div>
        {/* Name */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "#3A4A5A" }}>Name</label>
          <input
            type="text"
            value={profile.name}
            readOnly
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              background: "#f3f6fb",
              fontSize: "16px",
              color: "#333",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "#3A4A5A" }}>Email</label>
          <input
            type="text"
            value={profile.email}
            readOnly
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              background: "#f3f6fb",
              fontSize: "16px",
              color: "#333",
            }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "#3A4A5A" }}>Phone</label>
          <input
            type="text"
            value={profile.phone}
            readOnly
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              background: "#f3f6fb",
              fontSize: "16px",
              color: "#333",
            }}
          />
        </div>

        {/* Address */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontWeight: "600", color: "#3A4A5A" }}>Address</label>
          <textarea
            value={profile.address}
            readOnly
            rows={3}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              background: "#f3f6fb",
              fontSize: "16px",
              color: "#333",
              resize: "none",
            }}
          />
        </div>
      </div>

      {/* Edit Button */}
      <button
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          background: "#4a6cf7",
          color: "white",
          borderRadius: "12px",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#3d56d6")}
        onMouseOut={(e) => (e.target.style.background = "#4a6cf7")}
      >
        ✏️ Edit Profile
      </button>
    </div>
  );
};

export default Account;
