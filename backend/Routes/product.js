const express = require("express");
const authToken = require("../middleware/authToken");
const Product = require("../models/Product");
const uploadProductPermission = require("../middleware/permission");
const router = express.Router();


// upload new product
router.post("/upload-product", authToken, async (req, res) => {
    try {

        const sessionUserId = req.userId;
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        const newProduct = await Product(req.body);
        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: "New Product Added Successfully ...",
            error: false,
            success: true,
            data: savedProduct
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
})

// all products
router.get("/all-product", async (req, res) => {
    try {
        const allProducts = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            data: allProducts,
            success: true,
            error: false
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
})

// edit product
router.post("/update-product", authToken, async (req, res) => {
    try {
        const sessionUserId = req.userId;
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        // disintegrating product info
        const { _id, ...resBody } = req.body;

        const updateProduct = await Product.findByIdAndUpdate(_id, resBody);

        res.status(200).json({
            message: "Product updated successfully ...",
            error: false,
            success: true,
            data: updateProduct
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
})

// get single product of each category
router.get("/get-categoryProduct", async (req, res) => {
    try {
        // extract all unique category 
        const productCategory = await Product.distinct("category");

        // console.log("category list >>>", productCategory);

        // store one product of each category
        const productByCategory = [];

        for (const category of productCategory) {
            // find one product
            const product = await Product.findOne({ category });

            // if no product are available then dont need
            if (product) {
                productByCategory.push(product);
            }
        }

        // console.log("Product by category >>", productByCategory);


        res.status(200).json({
            data: productByCategory,
            message: "Category Product",
            success: true,
            error: false
        });


    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        });
    }
})


// get category wise product
router.post("/category-product", async (req, res) => {
    try {
        const { category } = req?.body || req?.query;
        const products = await Product.find({ category });

        res.status(200).json({
            message: "Category wise product fetching",
            error: false,
            success: true,
            data: products
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
})

// get a single product detail
router.post("/product-detail", async (req, res) => {
    try {
        const { productId } = req?.body;

        const product = await Product.findById(productId);

        res.status(200).json({
            message: "Product details fetched successfully",
            data: product,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
})

// search product -> search bar
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;

        // first convert query in regex(used for pattern matching)
        // 'i'-> to remove case sensitive
        // 'g'-> for global search
        const regex = new RegExp(query, 'i', 'g');

        const product = await Product.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        // console.log("Query backend>>", query);

        return res.status(200).json({
            message: "Search product list",
            data: product,
            success: true,
            error: true
        });


    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
})

// find product based on the filters
router.post("/filter-product", async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];

        const products = await Product.find({
            category: {
                "$in": categoryList
            }
        });

        return res.status(200).json({
            data: products,
            message: "Products after applying filters",
            success: true,
            error: false
        });


    } catch (err) {
        return res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
})
module.exports = router;