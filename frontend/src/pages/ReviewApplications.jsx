// src/pages/ReviewApplications.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function ReviewApplications() {
  const [appList, setAppList] = useState([]);
  const [error, setError] = useState(null);
  const [loadingReview, setLoadingReview] = useState(false); // Loading state for review action

  // Fetch applications data directly using Axios on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications/application-forms"
        );
        setAppList(response.data || []); // Set application list or empty array if no data
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.message || "Error fetching applications");
      }
    };

    fetchApplications();
  }, []); // Only runs once on component mount

  // Function to handle marking applications as reviewed
  const handleMarkReviewed = async (id) => {
    const confirmReview = window.confirm(
      "Are you sure you want to mark this application as reviewed?"
    );
    if (!confirmReview) return; // Exit if user cancels

    setLoadingReview(true); // Set loading state for review

    try {
      await axios.put(
        `http://localhost:5000/api/applications/application-forms/${id}/review`,
        {
          reviewed: true,
        }
      );

      // Optimistically update the local state
      setAppList((prevList) =>
        prevList.map((app) =>
          app._id === id ? { ...app, reviewed: true } : app
        )
      );
    } catch (error) {
      console.error("Error marking application as reviewed:", error);
      alert("Failed to mark the application as reviewed. Please try again.");
    } finally {
      setLoadingReview(false); // Reset loading state
    }
  };

  // Handle error state
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6">Review Applications</h1>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">University</th>
                <th className="py-2 px-4 border">Course</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Reviewed</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appList.map((app) => (
                <tr key={app._id}>
                  <td className="py-2 px-4 border">{app.name}</td>
                  <td className="py-2 px-4 border">{app.email}</td>
                  <td className="py-2 px-4 border">{app.phone}</td>
                  <td className="py-2 px-4 border">{app.university}</td>
                  <td className="py-2 px-4 border">{app.course}</td>
                  <td className="py-2 px-4 border">{app.status}</td>
                  <td className="py-2 px-4 border">
                    {app.reviewed ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border">
                    {!app.reviewed && (
                      <button
                        onClick={() => handleMarkReviewed(app._id)}
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${
                          loadingReview ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loadingReview}
                      >
                        {loadingReview ? "Reviewing..." : "Mark as Reviewed"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ReviewApplications;
