// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default to student
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set focus on the email input field when the component mounts
  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // Determine the login endpoint based on role
      const endpoint =
        role === "admin"
          ? "http://localhost:5000/api/admins/login"
          : "http://localhost:5000/api/students/login";

      const response = await axios.post(endpoint, { email, password });

      // Check if the response contains a token
      if (response.data?.token) {
        localStorage.setItem("authToken", response.data.token); // Save token to localStorage
        console.log("Token saved:", response.data.token); // Log for debugging

        // Clear password field for security
        setPassword("");

        // Redirect based on user role
        navigate(role === "admin" ? "/admin/dashboard" : "/student/dashboard");
      } else {
        setError("Login failed. Please try again."); // Handle unexpected response
      }
    } catch (error) {
      // Improved error handling
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              className="w-full px-4 py-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              id="email" // Added id for focus
              type="email"
              className="w-full px-4 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}{" "}
          {/* Display error message */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
