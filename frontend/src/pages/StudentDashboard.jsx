// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [applications, setApplications] = useState([]);
  const [studentError, setStudentError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const studentResponse = await axios.get(
          "http://localhost:5000/api/students/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudent(studentResponse.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setStudentError("Failed to fetch student data");
      }
    };

    const fetchApplications = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const applicationsResponse = await axios.get(
          "http://localhost:5000/api/students/applications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Update the state with applications or an empty array
        setApplications(applicationsResponse.data.applications || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
        // No need to set an error for applications; just show the message below if empty
        setApplications([]); // Ensures we don't show an error if the fetch fails
      }
    };

    fetchStudentData();
    fetchApplications();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

          {/* Student Information */}
          {studentError ? (
            <p>{studentError}</p>
          ) : student ? (
            <div className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <p className="mt-2">
                <strong>Name:</strong> {student.name}
              </p>
              <p className="mt-2">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="mt-2">
                <strong>University:</strong> {student.university}
              </p>
              <p className="mt-2">
                <strong>Course:</strong> {student.course}
              </p>
            </div>
          ) : (
            <p>No student information available.</p>
          )}

          {/* Applications */}
          <h2 className="text-2xl font-bold mb-4">My Applications</h2>
          {applications.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">University</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td className="border px-4 py-2">{app.name || "N/A"}</td>
                    <td className="border px-4 py-2">
                      {app.university || "N/A"}
                    </td>
                    <td className="border px-4 py-2">{app.course || "N/A"}</td>
                    <td className="border px-4 py-2">{app.status || "N/A"}</td>
                    <td className="border px-4 py-2">
                      {app.createdAt
                        ? new Date(app.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default StudentDashboard;
