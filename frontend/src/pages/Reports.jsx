// src/pages/Reports.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { saveAs } from "file-saver"; // file-saver for downloading files

const Reports = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [csvDownloaded, setCsvDownloaded] = useState(false); // State for CSV download

  // Fetch applications data directly using Axios
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications/application-forms/report"
        );
        setApplications(response.data); // Assuming data is in response.data
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.message || "Error fetching applications");
      }
    };

    fetchApplications();
  }, []); // Only runs once on component mount

  // Convert applications data to CSV format
  const generateCSV = () => {
    if (!applications.length) return; // Avoid generating CSV if no applications

    const headers = "Name,Email,Phone,University,Course,Status,CreatedAt\n";
    const csvContent = applications
      .map(
        (app) =>
          `${app.name},${app.email},${app.phone},${app.university},${
            app.course
          },${app.status},${new Date(app.createdAt).toLocaleString()}`
      )
      .join("\n");

    const csvData = new Blob([headers + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(csvData, "applications_report.csv"); // Using file-saver to trigger the download
    setCsvDownloaded(true); // Set CSV downloaded state to true
  };

  // Handle error state
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Reports</h1>

          <>
            <button
              onClick={generateCSV}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
              Download Report as CSV
            </button>
            {csvDownloaded && (
              <p className="text-green-500 mb-4">
                CSV downloaded successfully!
              </p>
            )}

            {applications.length === 0 ? (
              <p>No applications found.</p>
            ) : (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">University</th>
                    <th className="border px-4 py-2">Course</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td className="border px-4 py-2">{app.name}</td>
                      <td className="border px-4 py-2">{app.email}</td>
                      <td className="border px-4 py-2">{app.phone}</td>
                      <td className="border px-4 py-2">{app.university}</td>
                      <td className="border px-4 py-2">{app.course}</td>
                      <td className="border px-4 py-2">{app.status}</td>
                      <td className="border px-4 py-2">
                        {new Date(app.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Reports;
