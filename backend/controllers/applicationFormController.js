const ApplicationForm = require("../models/applicationForm");

// Submit application
const submitApplication = async (req, res) => {
  try {
    const { name, email, phone, university, course } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    const newApplication = new ApplicationForm({
      name,
      email,
      phone,
      university,
      course,
      fileUrl,
    });
    await newApplication.save();
    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting application", error: error.message });
  }
};

// Get all applications for the logged-in student
const getStudentApplications = async (req, res) => {
  try {
    // Assuming req.user.email is available from the JWT payload after authentication
    const studentEmail = req.user.email;

    console.log("Logged-in student email:", studentEmail); // Log the email

    // Find all applications by student email
    const applications = await ApplicationForm.find({ email: studentEmail });

    console.log("Applications found:", applications); // Log what is returned

    if (!applications.length) {
      return res
        .status(404)
        .json({ message: "No applications found for this student" });
    }

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationForm.find();
    res.status(200).json(applications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving applications", error: error.message });
  }
};

// Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await ApplicationForm.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res
      .status(200)
      .json({ message: "Application status updated", application });
  } catch (error) {
    res.status(500).json({
      message: "Error updating application status",
      error: error.message,
    });
  }
};

// Generate report
const generateReport = async (req, res) => {
  try {
    const applications = await ApplicationForm.find();
    res.status(200).json(applications); // For now, just return all applications
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating report", error: error.message });
  }
};

module.exports = {
  submitApplication,
  getStudentApplications, // Export the new function
  getAllApplications,
  updateApplicationStatus,
  generateReport,
};
