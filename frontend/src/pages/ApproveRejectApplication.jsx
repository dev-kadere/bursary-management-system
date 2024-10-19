// src/pages/ApproveRejectApplication.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function ApproveRejectApplication() {
  const [appList, setAppList] = useState([]);
  const [error, setError] = useState(null);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/applications/application-forms",
        { responseType: "json", timeout: 5000 }
      );
      setAppList(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.message || "Error fetching applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark this application as "${newStatus}"?`
    );
    if (!confirmed) return; // User canceled the action

    try {
      await axios.put(
        `http://localhost:5000/api/applications/application-forms/${id}/status`,
        { status: newStatus }
      );

      // Update the application status in the local state
      setAppList((prevList) =>
        prevList.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
      setError("Failed to update application status. Please try again.");
    }
  };

  // Early return for error state
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6">
            Approve/Reject Applications
          </h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">University</th>
                <th className="py-2 px-4 border">Course</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-2 px-4 text-center border">
                    No applications found.
                  </td>
                </tr>
              ) : (
                appList.map((app) => (
                  <tr key={app._id}>
                    <td className="py-2 px-4 border">{app.name}</td>
                    <td className="py-2 px-4 border">{app.email}</td>
                    <td className="py-2 px-4 border">{app.university}</td>
                    <td className="py-2 px-4 border">{app.course}</td>
                    <td className="py-2 px-4 border">{app.status}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleStatusChange(app._id, "approved")}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(app._id, "rejected")}
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ApproveRejectApplication;
