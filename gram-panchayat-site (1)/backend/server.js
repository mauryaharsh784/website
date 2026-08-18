const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware");

const Grievance = require("./models/Grievance");
const Admin = require("./models/Admin");

const familyRoutes = require("./routes/familyRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());

// ================================
// MONGODB
// ================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// ================================
// TEST ROUTE
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gram Panchayat API is running",
  });
});

// ================================
// FAMILY REGISTRY
// ================================

app.use("/api/families", familyRoutes);

// ================================
// CREATE ADMIN
// ================================

app.post("/api/admin/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const existingAdmin = await Admin.findOne({
      username: username.toLowerCase(),
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create admin",
    });
  }
});

// ================================
// ADMIN LOGIN
// ================================

app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const admin = await Admin.findOne({
      username: username.toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ================================
// CREATE GRIEVANCE
// PUBLIC ROUTE
// ================================

app.post("/api/grievances", async (req, res) => {
  try {
    console.log("Grievance request body:", req.body);

    const {
      name,
      mobile,
      email,
      subject,
      message,
    } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    const cleanMobile = mobile
      ? String(mobile).trim()
      : "Not provided";

    const cleanSubject = subject
      ? String(subject).trim()
      : "General Enquiry";

    const cleanMessage = String(message).trim();

    if (cleanMessage.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 5 characters",
      });
    }

    const grievance = await Grievance.create({
      name: cleanName,
      mobile: cleanMobile,
      email: cleanEmail,

      address: "",
      category: cleanSubject,
      description: cleanMessage,

      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Grievance submitted successfully",
      grievance,
    });
  } catch (error) {
    console.error("Create grievance error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit grievance",
    });
  }
});

// ================================
// GET ALL GRIEVANCES
// ADMIN ONLY
// ================================

app.get(
  "/api/grievances",
  authMiddleware,
  async (req, res) => {
    try {
      const grievances = await Grievance.find().sort({
        createdAt: -1,
      });

      return res.status(200).json({
        success: true,
        count: grievances.length,
        grievances,
      });
    } catch (error) {
      console.error("Fetch grievances error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch grievances",
      });
    }
  }
);

// ================================
// GET SINGLE GRIEVANCE
// ADMIN ONLY
// ================================

app.get(
  "/api/grievances/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const grievance = await Grievance.findById(
        req.params.id
      );

      if (!grievance) {
        return res.status(404).json({
          success: false,
          message: "Grievance not found",
        });
      }

      return res.status(200).json({
        success: true,
        grievance,
      });
    } catch (error) {
      console.error("Get grievance error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch grievance",
      });
    }
  }
);

// ================================
// UPDATE STATUS
// ADMIN ONLY
// ================================

app.patch(
  "/api/grievances/:id/status",
  authMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "In Progress",
        "Resolved",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      const grievance =
        await Grievance.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!grievance) {
        return res.status(404).json({
          success: false,
          message: "Grievance not found",
        });
      }

      return res.json({
        success: true,
        message: "Status updated successfully",
        grievance,
      });
    } catch (error) {
      console.error("Update status error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to update status",
      });
    }
  }
);

// ================================
// DELETE GRIEVANCE
// ADMIN ONLY
// ================================

app.delete(
  "/api/grievances/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const grievance =
        await Grievance.findByIdAndDelete(
          req.params.id
        );

      if (!grievance) {
        return res.status(404).json({
          success: false,
          message: "Grievance not found",
        });
      }

      return res.json({
        success: true,
        message: "Grievance deleted successfully",
      });
    } catch (error) {
      console.error("Delete grievance error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to delete grievance",
      });
    }
  }
);

// ================================
// 404 ROUTE
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ================================
// START SERVER
// ================================

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});