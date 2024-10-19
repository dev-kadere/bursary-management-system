const Student = require("../models/student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApplicationForm = require("../models/applicationForm"); // Assuming this model holds applications

// Create a new student
exports.createStudent = async (req, res) => {
  const { name, email, password, phone, university, course } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      phone,
      university,
      course,
    });

    await newStudent.save();
    res
      .status(201)
      .json({ message: "Student created successfully", student: newStudent });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Student login
exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Include email in the token payload
    const token = jwt.sign(
      { id: student._id, role: "student", email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      role: "student",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        university: student.university,
        course: student.course,
      },
    });
  } catch (error) {
    console.error("Error logging in student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get the currently logged-in student
exports.getCurrentStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStudentApplications = async (req, res) => {
  try {
    const studentEmail = req.user.email;

    console.log("Logged-in student email:", studentEmail);

    // Find all applications by student email
    const applications = await ApplicationForm.find({ email: studentEmail });

    // Check if applications array is empty
    if (!applications.length) {
      return res.status(200).json({
        message: "No applications found for this student.",
        applications: [], // Return an empty array
      });
    }

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
