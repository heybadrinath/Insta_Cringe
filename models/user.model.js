const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    userName:String,
    password:String
    
})

module.exports = mongoose.model("users", UserSchema)