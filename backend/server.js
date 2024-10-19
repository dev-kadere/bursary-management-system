const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const adminRoutes = require("./routes/adminRoutes");
const applicationFormRoutes = require("./routes/applicationFormRoutes");
const studentRoutes = require("./routes/studentRoutes");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/applications", applicationFormRoutes);
app.use("/api/students", studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
