const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: String,
    profilePic: String,
    role: String
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;