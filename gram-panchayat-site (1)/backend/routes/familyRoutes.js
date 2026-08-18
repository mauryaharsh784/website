const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerFamily,
  findFamily,
  getFamilies,
  getFamilyById,
  updateFamilyStatus,
  deleteFamily,
} = require("../controllers/familyController");

const router = express.Router();

// Public
router.post("/", registerFamily);
router.get("/search", findFamily);

// Admin only
router.get("/", authMiddleware, getFamilies);
router.get("/:id", authMiddleware, getFamilyById);
router.patch("/:id/status", authMiddleware, updateFamilyStatus);
router.delete("/:id", authMiddleware, deleteFamily);

module.exports = router;
