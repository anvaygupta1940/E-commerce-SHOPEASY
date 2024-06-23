const User = require("../models/User");

const uploadProductPermission = async (userId) => {
    // if the logged in user is admin then only he can upload the new product

    const user = await User.findById(userId);

    if (user.role !== "ADMIN") {
        return false;
    }

    return true;
}

module.exports = uploadProductPermission;