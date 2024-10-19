// src/pages/BursaryApplicationForm.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function BursaryApplicationForm() {
  const location = useLocation();
  const { student } = location.state || {}; // Get student data from location state

  const [name, setName] = useState(student?.name || ""); // Prefill with student data
  const [email, setEmail] = useState(student?.email || "");
  const [phone, setPhone] = useState(student?.phone || ""); // Add phone prefill
  const [university, setUniversity] = useState(student?.university || "");
  const [course, setCourse] = useState(student?.course || "");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Create a FormData object to handle the multipart/form-data request
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("university", university);
    formData.append("course", course);
    if (file) formData.append("fileUrl", file); // Append the file

    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Success message from backend
      setMessage(response.data.message);
      // Clear the form fields after submission
      setName("");
      setEmail("");
      setPhone("");
      setUniversity("");
      setCourse("");
      setFile(null);
    } catch (error) {
      // Error message handling
      setMessage(
        error.response?.data?.message || "Error submitting application"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold">Apply for Bursary</h1>
          {message && <p className="text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="0700000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">University</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Course</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Upload Supporting Document
              </label>
              <input
                type="file"
                className="w-full px-4 py-2 border rounded"
                onChange={(e) => {
                  const uploadedFile = e.target.files[0];
                  if (
                    uploadedFile &&
                    !/\.pdf$|\.jpg$|\.png$/i.test(uploadedFile.name)
                  ) {
                    setMessage("Please upload a valid file (PDF, JPG, PNG)");
                    setFile(null); // Clear the file if the validation fails
                  } else {
                    setFile(uploadedFile);
                  }
                }}
                accept=".pdf,.jpg,.png"
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-600 text-white py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default BursaryApplicationForm;
