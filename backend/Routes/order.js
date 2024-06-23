const authToken = require("../middleware/authToken");
const Order = require("../models/Order");

const router = require("express").Router();


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


module.exports = router;