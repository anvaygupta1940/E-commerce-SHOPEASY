const router = require("express").Router();
const AddToCart = require("../models/AddToCart");
const authToken = require("../middleware/authToken");


// adding product in cart
router.post("/addToCart", authToken, async (req, res) => {
    try {
        const currUserId = req.userId;
        const { productId } = req?.body

        // if product already added in cart then show error
        const isProductAvailable = await AddToCart.findOne({ productId: productId, userId: currUserId });

        if (isProductAvailable) {
            return res.status(200).json({
                message: "Product Already exist in Cart",
                success: false,
                error: true
            });
        }
        const payload = {
            productId: productId,
            quantity: 1,
            userId: currUserId
        }

        const newAddToCart = new AddToCart(payload);
        const savedAddToCart = await newAddToCart.save();

        return res.status(201).json({
            message: "Product added in cart",
            data: savedAddToCart,
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            success: false,
            error: true
        })
    }
})

// count number of products in the cart of a user
router.get("/countAddToCartProduct", authToken, async (req, res) => {
    try {
        const userId = req.userId;

        const count = await AddToCart.countDocuments({ userId: userId });

        return res.status(200).json({
            data: {
                count: count
            },
            message: "product counted in cart",
            error: false,
            success: true
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
})

// extract cart products
router.get("/view-cart-product", authToken, async (req, res) => {
    try {
        const userId = req.userId;

        const allProducts = await AddToCart.find({
            userId: userId
        }).populate("productId");

        res.status(200).json({
            data: allProducts,
            message: "Cart Data",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err?.message || err,
            success: false,
            error: true
        })
    }
})

// update cart products
router.post("/update-cart-product", authToken, async (req, res) => {
    try {
        const userId = req.userId;
        const addToCartProductId = req?.body?._id;
        const qty = req?.body?.quantity;

        const updatedProduct = await AddToCart.updateOne({ _id: addToCartProductId }, {
            ...(qty && { quantity: qty })
        });

        return res.status(200).json({
            message: "Add To Cart Porduct Updated",
            success: true,
            error: false,
            data: updatedProduct
        });
    } catch (err) {
        return res.status(400).json({
            message: err?.message || err,
            success: false,
            error: true
        })
    }
})

//delete product from cart
router.post("/delete-cart-product", authToken, async (req, res) => {
    try {
        const userId = req.userId;
        const addToCartProductId = req?.body?._id

        const deleteProduct = await AddToCart.deleteOne({ _id: addToCartProductId });

        return res.status(200).json({
            message: "Product deleted from cart",
            success: true,
            error: false,
            data: deleteProduct
        })
    } catch (err) {
        return res.status(400).json({
            message: err?.message || err,
            success: false,
            error: true
        });
    }
})
module.exports = router;