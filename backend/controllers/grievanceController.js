const Grievance = require("../models/Grievance");

// Create Grievance
const createGrievance = async (req, res) => {
  try {
    const { name, mobile, email, subject, message } = req.body;

    if (!name || !mobile || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
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
    console.error("Create Grievance Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get All Grievances
const getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      grievances,
    });
  } catch (error) {
    console.error("Get Grievances Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createGrievance,
  getGrievances,
};