const express = require("express")
const { getProfile, createProfile, deleteProfile } = require("../controllers/profileControllers")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.route('/').get(protect, getProfile)
router.route('/create').post(protect, createProfile)
router.route('/delete').delete(protect, deleteProfile)

module.exports = router