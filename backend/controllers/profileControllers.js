const Profile = require("../models/profileModel");
const asyncHandler = require("express-async-handler");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.userId });

  if (!profile) {
    res.status(404);
    throw new Error("Profile not found");
  }
  res.json(profile);
});

const createProfile = asyncHandler(async (req, res) => {
  const existingProfile = await Profile.findOne({ user: req.user._id });

  if (existingProfile) {
    res.status(400);
    throw new Error("Profile already exists");
  }

  const { name, career, bio, work, education, skill, prof_pic } = req.body;

  if (!name || !career || !bio || !work || !education || !skill) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const profile = new Profile({
    user: req.user._id,
    name,
    career,
    bio,
    work,
    education,
    skill,
    prof_pic,
  });

  const createdProfile = await profile.save();
  res.status(201).json(createdProfile);
});

const editProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile not found");
  }

  // Only allow the user who owns the profile to update
  if (profile.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this profile");
  }

  const { name, career, bio, work, education, skill, prof_pic } = req.body;

  profile.name = name || profile.name;
  profile.career = career || profile.career;
  profile.bio = bio || profile.bio;
  profile.work = work || profile.work;
  profile.education = education || profile.education;
  profile.skill = skill || profile.skill;
  profile.prof_pic = prof_pic || profile.prof_pic;

  const updatedProfile = await profile.save();
  res.json(updatedProfile);
});

const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile not found");
  }

  if (profile.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  await profile.deleteOne();
  res.json({ message: "Profile deleted" });
});

module.exports = { getProfile, createProfile, editProfile, deleteProfile };
