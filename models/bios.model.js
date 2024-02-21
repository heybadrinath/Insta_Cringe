const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  UserName: String,
  Bio: String,
  userId: Number
});

const Profile = mongoose.model("InstaBios", profileSchema);

module.exports = Profile;
