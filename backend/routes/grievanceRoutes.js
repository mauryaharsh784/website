const express = require("express");
const Grievance = require("../models/Grievance");

const router = express.Router();

// ===============================
// Submit a new grievance
// ===============================
router.post("/", async (req, res) => {
  try {
    const { name, mobile, email, subject, message } = req.body;

    if (!name || !mobile || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, subject and message are required",
      });
    }

    const grievance = await Grievance.create({
      name,
      mobile,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Grievance submitted successfully",
      grievance,
    });
  } catch (error) {
    console.error("Grievance error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ===============================
// Get all grievances
// ===============================
router.get("/", async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: grievances.length,
      grievances,
    });
  } catch (error) {
    console.error("Fetch grievances error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ===============================
// Get single grievance
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found",
      });
    }

    res.json({
      success: true,
      grievance,
    });
  } catch (error) {
    console.error("Fetch grievance error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;