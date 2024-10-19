// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsResponse, applicationsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/students"),
          axios.get("http://localhost:5000/api/applications/application-forms"),
        ]);

        setStudents(studentsResponse.data);
        setApplications(applicationsResponse.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []); // Run once on mount

  const totalStudents = students.length || 0;
  const totalApplications = applications.length || 0;
  const approvedApplications =
    applications.filter((app) => app.status === "approved").length || 0;
  const pendingApplications =
    applications.filter((app) => app.status === "pending").length || 0;
  const rejectedApplications =
    applications.filter((app) => app.status === "rejected").length || 0;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">{error}</div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Total Students", value: totalStudents },
              { title: "Total Applications", value: totalApplications },
              { title: "Approved Applications", value: approvedApplications },
              { title: "Pending Applications", value: pendingApplications },
              { title: "Rejected Applications", value: rejectedApplications },
            ].map((stat) => (
              <div key={stat.title} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">{stat.title}</h2>
                <p className="text-2xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminDashboard;
