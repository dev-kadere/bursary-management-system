// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, element }) => {
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwt.decode(token); // Use jsonwebtoken to decode
      userRole = decodedToken.role;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }

  // Check if the user's role is allowed to access the route
  if (allowedRoles.includes(userRole)) {
    return element; // Render the requested component
  }

  return <Navigate to="/login" />; // Redirect to login if not authorized
};

export default ProtectedRoute;
