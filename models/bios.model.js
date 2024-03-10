const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  UserName: String,
  Bio: String,
  UserId: String,
  createdBy: String
});

const Profile = mongoose.model("InstaBios", profileSchema);

module.exports = Profile;
