import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

import {
  MdHome,
  MdDashboard,
  MdAnalytics,
  MdSettings,
  MdPerson,
  MdReport,
  MdEmail,
  MdLogout,
  MdAdd,
  MdDelete,
  MdEdit
} from "react-icons/md";

import "./style.css";

/* -------------------------------
   MENU ITEMS (LOGOUT FIXED)
-------------------------------- */
const menuItems = [
  { icon: <MdHome size={24} />, to: "/", label: "Home" },
  { icon: <MdDashboard size={24} />, to: "/orders", label: "Orders" },

  { icon: <MdSettings size={24} />, to: "/settings", label: "Settings" },
  { icon: <MdPerson size={24} />, to: "/account", label: "Account" },
  
  { icon: <MdEmail size={24} />, to: "/contact", label: "Contact" },

  // Admin routes
  { icon: <MdAdd size={24} />, to: "/add-product", label: "Add Product" },
  { icon: <MdDelete size={24} />, to: "/delete-product", label: "Delete Product" },
  { icon: <MdEdit size={24} />, to: "/update-product", label: "Update Product" },
  { icon: <MdAnalytics size={24} />, to: "/analytics", label: "Analytics" },

  // ⭐ Correct Logout (NO .to)
  { icon: <MdLogout size={24} />, label: "Logout", isLogout: true }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /* -------------------------------
     LOGOUT FUNCTION
  -------------------------------- */
  const handleLogout = () => {
    logout();
    localStorage.clear();
    setIsAuthenticated(false);

    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      {/* Sidebar Menu */}
      <nav className="menu">
        <ul className="menu-content">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="menu-icon-label"
              title={item.label}
              onClick={() =>
                item.isLogout ? handleLogout() : navigate(item.to)
              }
              style={{ cursor: "pointer" }}
            >
              <div className="menu-link">
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Layout Grid */}
      <div className="container">
        <div className="sidebar"></div>

        <div className="main">
          <Outlet />
        </div>

        <div className="footer">© copyright Agriconnect</div>
      </div>
    </>
  );
};

export default HomePage;
