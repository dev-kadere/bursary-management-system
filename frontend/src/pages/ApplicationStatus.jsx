// src/pages/ApplicationStatus.jsx
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import axios from "axios"; // Import Axios
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const response = await axios.get("/api/applications/application-forms"); // Adjust endpoint as necessary
        setApplications(response.data);
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchApplicationStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl mb-4">Application Status</h1>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Course</th>
                <th className="border-b px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td className="border-b px-4 py-2">{app.course}</td>
                  <td className="border-b px-4 py-2">{app.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ApplicationStatus;
