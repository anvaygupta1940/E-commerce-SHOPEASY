const stripe = require("../config/stripe");
const authToken = require("../middleware/authToken");
const router = require("express").Router();
const User = require("../models/User");
const dotenv = require("dotenv");


dotenv.config();

router.post("/checkout", authToken, async (req, res) => {
    try {

        const { cartItems } = req.body;

        // console.log("CartItems for payment >>", cartItems);

        const user = await User.findOne({ _id: req.userId })

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PUMZ5SI7I8p7o5kzRE9CFrH'
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: req.userId
            },
            line_items: cartItems.map((item, index) => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        }

        const session = await stripe.checkout.sessions.create(params);
        return res.status(303).json(session);
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
})


module.exports = router;