// src/App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import ApproveRejectApplication from "./pages/ApproveRejectApplication";
import BursaryApplicationForm from "./pages/BursaryApplicationForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import ReviewApplications from "./pages/ReviewApplications";
import StudentDashboard from "./pages/StudentDashboard";

const App = () => {
  const [userRole, setUserRole] = useState(null); // To store user role

  useEffect(() => {
    // Check for user role in localStorage or similar
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token or fetch the user data to determine the role
      const user = JSON.parse(atob(token.split(".")[1])); // Simple token decoding
      setUserRole(user.role); // Assuming role is stored in the token
    }
  }, []);

  // Handle redirection based on user role
  const getRedirectPath = () => {
    if (userRole === "admin") return "/admin/dashboard"; // Change this path accordingly
    if (userRole === "student") return "/student/dashboard"; // Change this path accordingly
    return "/login"; // Default to login if no role found
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />{" "}
      {/* Redirect to login */}
      <Route path="/login" element={<Login setUserRole={setUserRole} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route
        path="/admin/approve-reject"
        element={<ApproveRejectApplication />}
      />
      <Route path="/admin/reports" element={<Reports />} />
      <Route
        path="/admin/review-applications/:id"
        element={<ReviewApplications />}
      />
      <Route path="/bursary-application" element={<BursaryApplicationForm />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="*" element={<Navigate to="/login" />} />{" "}
      {/* Redirect any unknown route to login */}
    </Routes>
  );
};

export default App;
