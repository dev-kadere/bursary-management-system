// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Updated to use useNavigate instead of useHistory

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    navigate("/"); // Redirect to home or login page
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Bursary Management System</h1>
        <div className="flex space-x-4">
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
