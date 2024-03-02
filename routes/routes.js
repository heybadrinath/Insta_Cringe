const express = require("express");
const router = express.Router();
const Profile = require("../models/bios.model");
const joi = require("joi");

const postValidate = joi.object({
  UserName: joi.string().required(),
  Bio: joi.string().required(),
  userId: joi.string().required(),
});
const patchValidate = joi.object({
  UserName: joi.string(),
  Bio: joi.string(),
});

router.get("/getBio", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Internal Server Error");
  }
});

router.post("/postBio", async (req, res) => {
  try {
    const { UserName, Bio, userId } = req.body;
    console.log(req.body);

    const { error, value } = postValidate.validate({ UserName, Bio, userId });

    if (error) {
      res.status(400).json(error);
    } else {
      const profile = new Profile({ UserName, Bio, userId });
      await profile.save();
      res.status(201).json({ value });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/putBio/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const { error, value } = patchValidate.validate(updates);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { $set: updates },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(value);
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
