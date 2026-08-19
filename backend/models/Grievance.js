const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Water Supply",
        "Roads & Infrastructure",
        "Sanitation",
        "Electricity",
        "Public Health",
        "Other",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Generate reference number automatically
grievanceSchema.pre("save", async function (next) {
  try {
    if (this.referenceNumber) {
      return next();
    }

    let referenceNumber;
    let exists = true;

    while (exists) {
      const randomNumber = Math.floor(
        10000 + Math.random() * 90000
      );

      referenceNumber = `GP-2026-${randomNumber}`;

      exists = await mongoose.models.Grievance.exists({
        referenceNumber,
      });
    }

    this.referenceNumber = referenceNumber;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model(
  "Grievance",
  grievanceSchema
);