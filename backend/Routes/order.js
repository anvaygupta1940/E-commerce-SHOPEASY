const authToken = require("../middleware/authToken");
const Order = require("../models/Order");
const User = require("../models/User");

const router = require("express").Router();

// order list of a user
router.get("/order-list", authToken, async (req, res) => {

    try {
        const currUserId = req.userId;

        const orderList = await Order.find({ userId: currUserId }).sort({ createdAt: -1 });

        return res.status(200).json({
            data: orderList,
            success: true,
            error: false,
            message: "Order list"
        });


    } catch (err) {
        return res.status(400).json({
            message: err?.message || err,
            success: false,
            error: true
        })
    }
})


// all order list for admin
router.get("/all-orders", authToken, async (req, res) => {

    try {

        const currUserId = req.userId;

        const user = await User.findById(currUserId);

        if (user.role !== 'ADMIN') {
            return res.status(500).json({
                message: "not-authorized for access"
            })
        }

        const allOrders = await Order.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "all orders",
            data: allOrders,
            success: true,
            error: false
        });


    } catch (err) {
        return res.status(400).json({
            message: err?.message || err,
            success: false,
            error: true
        })
    }
})


module.exports = router;