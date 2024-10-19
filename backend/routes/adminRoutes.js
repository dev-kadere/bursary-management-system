const express = require("express");
const {
  createAdmin,
  loginAdmin,
  getAdmins,
} = require("../controllers/adminController");

const router = express.Router();

// Route to create a new admin
router.post("/", createAdmin);

// Route for admin login
router.post("/login", loginAdmin);

// Route to get all admins
router.get("/", getAdmins);

module.exports = router;
