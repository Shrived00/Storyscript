const Profile = require("../models/profileModel")
const asyncHandler = require('express-async-handler');

const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.find({ user: req.user._id });
    res.json(profile)
})
const createProfile = asyncHandler(async (req, res) => {
    const { name, career, bio, work, education, skill, prof_pic } = req.body;

    if (!name || !career || !bio || !work || !education || !skill) {
        res.status(400)
        throw new Error("Please Fill all the Fields");
    } else {

        const profile = new Profile({ user: req.user._id, name, career, bio, work, education, skill, prof_pic })

        const createdProfile = await profile.save();
        res.status(201).json(createdProfile);

    }
})
const deleteProfile = asyncHandler(async (req, res) => {

    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
        res.status(404);
        throw new Error("Profile not found");
    }

    if (profile.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Profile not found");

    }

    if (profile.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    await profile.deleteOne();
    res.json({ message: "Profile deleted" });
})

module.exports = { getProfile, createProfile, deleteProfile }