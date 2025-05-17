const express = require("express");
const {
  getProfile,
  createProfile,
  deleteProfile,
  editProfile,
} = require("../controllers/profileControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId", getProfile);
router.route("/create").post(protect, createProfile);
router.route("/edit").put(protect, editProfile);
router.route("/delete").delete(protect, deleteProfile);

module.exports = router;
