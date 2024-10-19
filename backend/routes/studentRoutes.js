const express = require("express");
const {
  createStudent,
  loginStudent,
  getStudents,
  getCurrentStudent,
  getStudentApplications, // Import the new controller function
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a new student
router.post("/", createStudent);

// Route for student login
router.post("/login", loginStudent);

// Route to get all students (admin access)
router.get("/", getStudents);

// Route to get the current logged-in student
router.get("/me", authMiddleware, getCurrentStudent);

// Route to get all applications for the logged-in student
router.get("/applications", authMiddleware, getStudentApplications);

module.exports = router;
