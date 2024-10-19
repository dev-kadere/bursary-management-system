const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  submitApplication,
  getAllApplications,
  getStudentApplications, // Import the new function
  updateApplicationStatus,
  generateReport,
} = require("../controllers/applicationFormController");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Application routes
router.post("/", upload.single("fileUrl"), submitApplication); // Submit an application
router.get("/my-applications", getStudentApplications); // Get applications for the logged-in student
router.get("/application-forms", getAllApplications); // Get all applications
router.put("/application-forms/:id/status", updateApplicationStatus); // Update application status
router.get("/application-forms/report", generateReport); // Generate report

module.exports = router;
