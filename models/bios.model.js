const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  UserName: String,
  Bio: String,
  userId: String
});

const Profile = mongoose.model("InstaBios", profileSchema);

module.exports = Profile;
