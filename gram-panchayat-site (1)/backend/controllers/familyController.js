const Family = require("../models/Family");

// ================================
// REGISTER FAMILY
// PUBLIC ROUTE
// ================================
const registerFamily = async (req, res) => {
  try {
    const {
      headName,
      fatherOrHusbandName,
      wardNo,
      address,
      mobile,
      email,
      rationCardNo,
      members,
    } = req.body;

    if (!headName || !wardNo || !address || !mobile) {
      return res.status(400).json({
        success: false,
        message:
          "Head name, ward number, address and mobile number are required",
      });
    }

    if (!/^[6-9]\d{9}$/.test(String(mobile).trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number",
      });
    }

    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add at least one family member",
      });
    }

    for (const member of members) {
      if (!member.name || !member.relation || !member.gender || member.age === undefined || member.age === "") {
        return res.status(400).json({
          success: false,
          message: "Each family member needs a name, relation, age and gender",
        });
      }
    }

    const family = await Family.create({
      headName: String(headName).trim(),
      fatherOrHusbandName: fatherOrHusbandName
        ? String(fatherOrHusbandName).trim()
        : "",
      wardNo: String(wardNo).trim(),
      address: String(address).trim(),
      mobile: String(mobile).trim(),
      email: email ? String(email).trim().toLowerCase() : "",
      rationCardNo: rationCardNo ? String(rationCardNo).trim() : "",
      members: members.map((m) => ({
        name: String(m.name).trim(),
        relation: String(m.relation).trim(),
        age: Number(m.age),
        gender: m.gender,
        occupation: m.occupation ? String(m.occupation).trim() : "",
      })),
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Family registered successfully",
      family,
    });
  } catch (error) {
    console.error("Register family error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to register family",
    });
  }
};

// ================================
// FIND MY FAMILY
// PUBLIC ROUTE — requires the registered mobile number,
// so a visitor can only look up records tied to their own number.
// ================================
const findFamily = async (req, res) => {
  try {
    const { mobile, familyId } = req.query;

    if (!mobile || !/^[6-9]\d{9}$/.test(String(mobile).trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter the valid 10-digit mobile number used at registration",
      });
    }

    const filter = { mobile: String(mobile).trim() };

    if (familyId) {
      filter.familyId = String(familyId).trim().toUpperCase();
    }

    const families = await Family.find(filter).sort({ createdAt: -1 });

    if (!families.length) {
      return res.status(404).json({
        success: false,
        message: "No family record found for this mobile number",
      });
    }

    return res.status(200).json({
      success: true,
      count: families.length,
      families,
    });
  } catch (error) {
    console.error("Find family error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to search for family records",
    });
  }
};

// ================================
// GET ALL FAMILIES
// ADMIN ONLY
// ================================
const getFamilies = async (req, res) => {
  try {
    const families = await Family.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: families.length,
      families,
    });
  } catch (error) {
    console.error("Fetch families error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch families",
    });
  }
};

// ================================
// GET SINGLE FAMILY
// ADMIN ONLY
// ================================
const getFamilyById = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);

    if (!family) {
      return res.status(404).json({
        success: false,
        message: "Family not found",
      });
    }

    return res.status(200).json({
      success: true,
      family,
    });
  } catch (error) {
    console.error("Get family error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch family",
    });
  }
};

// ================================
// UPDATE FAMILY STATUS (verify / reject)
// ADMIN ONLY
// ================================
const updateFamilyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Verified", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const family = await Family.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!family) {
      return res.status(404).json({
        success: false,
        message: "Family not found",
      });
    }

    return res.json({
      success: true,
      message: "Status updated successfully",
      family,
    });
  } catch (error) {
    console.error("Update family status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update status",
    });
  }
};

// ================================
// DELETE FAMILY
// ADMIN ONLY
// ================================
const deleteFamily = async (req, res) => {
  try {
    const family = await Family.findByIdAndDelete(req.params.id);

    if (!family) {
      return res.status(404).json({
        success: false,
        message: "Family not found",
      });
    }

    return res.json({
      success: true,
      message: "Family record deleted successfully",
    });
  } catch (error) {
    console.error("Delete family error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete family",
    });
  }
};

module.exports = {
  registerFamily,
  findFamily,
  getFamilies,
  getFamilyById,
  updateFamilyStatus,
  deleteFamily,
};
