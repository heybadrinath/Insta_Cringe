const express = require("express");
const router = express.Router();
const Profile = require("../models/bios.model");
const { get } = require("http");
router.get("/getBio", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/postBio", async (req, res) => {
  try {
    const { UserName, Bio, userId } = req.body;
    console.log(req.body);
    if (!UserName || !Bio || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (
      typeof UserName !== "string" ||
      typeof Bio !== "string" ||
      typeof userId !== "number"
    ) {
      return res.status(400).json({ message: "Invalid data types for fields" });
    }

    const profile = new Profile({ UserName, Bio, userId });
    await profile.save();
    res.status(201).json({ message: "Profile added successfully", profile });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.patch("/putBio/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    );

    if (!profile) {
      console.log(profile);
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await Profile.findOneAndDelete({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
