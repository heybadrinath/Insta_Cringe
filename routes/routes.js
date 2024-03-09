const express = require("express");
const router = express.Router();
const Profile = require("../models/bios.model");
const users = require("../models/user.model");
const joi = require("joi");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

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

router.patch("/putBio/:UserId", async (req, res) => {
  try {
    let { UserId } = req.params;
    UserId = parseInt(UserId);

    const updates = req.body;

    const { error, value } = patchValidate.validate(updates);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    console.log(typeof UserId);
    const profile = await Profile.findOneAndUpdate(
      { UserId: UserId },
      updates,
      { new: true }
    );
    console.log(profile);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(value);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:UserId", async (req, res) => {
  try {
    let { UserId } = req.params;
    UserId = parseInt(UserId);
    const profile = await Profile.findOneAndDelete({ UserId: UserId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const data = await users.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
});

router.use(cookieParser());
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await users.findOne({ userName: userName }); // Use findOne instead of find
    if (!user) {
      // If user not found, return error
      return res.status(400).json({
        message: "Username is incorrect",
      });
    }

    // Compare passwords using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // If passwords don't match, return error
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const secret = process.env.SECRET_MESSAGE;
    const token = jwt.sign({ userName }, secret);
    res.json({ message: "Login successful", token }); // Return success message and user data
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("userToken");
    res.send("Logout successful");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
