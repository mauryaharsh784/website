const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    relation: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    occupation: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const familySchema = new mongoose.Schema(
  {
    familyId: {
      type: String,
      unique: true,
      index: true,
    },

    headName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherOrHusbandName: {
      type: String,
      trim: true,
      default: "",
    },

    wardNo: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    rationCardNo: {
      type: String,
      trim: true,
      default: "",
    },

    members: {
      type: [memberSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate family ID
// Example: GP-FAM-2026-12345
familySchema.pre("save", async function () {
  // If family ID already exists, do nothing
  if (this.familyId) {
    return;
  }

  const year = new Date().getFullYear();

  let familyId;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(
      10000 + Math.random() * 90000
    );

    familyId = `GP-FAM-${year}-${randomNumber}`;

    exists = await mongoose.models.Family.exists({
      familyId,
    });
  }

  this.familyId = familyId;
});

module.exports = mongoose.model("Family", familySchema);