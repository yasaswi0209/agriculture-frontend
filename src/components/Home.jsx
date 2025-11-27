import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { FaUserCircle } from "react-icons/fa";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#232323",
    color: "#f0f0f0",
    marginLeft: 0,
    paddingLeft: 0,
  },
  header: {
    width: "100vw",
    background: "#232323",
    color: "#fff",
    fontSize: "2.5rem",
    fontWeight: "bold",
    padding: "2.2rem 2.8rem 2.2rem 7.5vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    position: "static",
  },
  main: {
    flex: 1,
    padding: "2rem 3rem",
    marginLeft: 0,
  },
  footer: {
    padding: "1.15rem 0",
    textAlign: "center",
    color: "#aaa",
    background: "transparent",
    width: "100vw",
    position: "fixed",
    bottom: 0,
  },
  profileMenu: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "130%",
    right: 0,
    background: "#ddd",
    borderRadius: "0.6rem",
    boxShadow: "0 0 12px rgba(0,0,0,0.15)",
    padding: "0.8rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    zIndex: 100,
  },
  dropdownLink: {
    color: "#232323",
    textDecoration: "none",
    fontWeight: "600",
    cursor: "pointer",
  },
  dropdownButton: {
    border: "none",
    backgroundColor: "#f44336",
    color: "white",
    padding: "0.4rem 0.7rem",
    borderRadius: "0.4rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  button: {
    padding: "0.35rem 0.8rem",
    borderRadius: "0.5rem",
    border: "none",
    backgroundColor: "#3a7bd5",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1>E-Commerce</h1>
        <div style={styles.headerRight}>
          {isAuthenticated ? (
            <div style={styles.profileMenu}>
              <FaUserCircle
                className="profile-icon"
                size={28}
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              />
              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <Link style={styles.dropdownLink} to="/cart" onClick={() => setDropdownOpen(false)}>Cart</Link>
                  <Link style={styles.dropdownLink} to="/orders" onClick={() => setDropdownOpen(false)}>Orders</Link>
                  <button style={styles.dropdownButton} onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"><button style={styles.button}>Login</button></Link>
              <Link to="/signup"><button style={styles.button}>Sign Up</button></Link>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <Outlet />
      </div>

      {/* Footer */}
      <div style={styles.footer}>@ copyright Agriconnect</div>
    </div>
  );
};

export default HomePage;
