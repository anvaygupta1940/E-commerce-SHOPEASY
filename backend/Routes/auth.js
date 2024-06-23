const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authToken = require("../middleware/authToken");


// register route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check whether uer with this email exist or not
        const isUser = await User.findOne({ email });

        if (isUser) {
            throw new Error("User already exists ..");
        }


        if (!name) {
            throw new Error("Please provide name")
        }
        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }



        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (!hashedPassword) {
            throw new Error("Error in hashing password")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashedPassword
        }
        const newUser = new User(payload);

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User created successfully ...",
            error: false,
            success: true,
            data: savedUser
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
})


router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide passowrd");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User does not exist");
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
            const accessToken = jwt.sign({
                id: user._id,
                email: email
            }, process.env.JWT_SEC_KEY, { expiresIn: "1d" });

            const tokenOption = {
                httpOnly: true,
                secure: true
            }
            res.status(200).cookie("token", accessToken, tokenOption).json({
                message: "User Login successfully ...",
                error: false,
                success: true,
                data: accessToken
            })
        } else {
            throw new Error("Password does not match");
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
})


router.get("/user-details", authToken, async (req, res) => {
    try {
        // console.log("Logged in User id >>", req.userId);
        const user = await User.findById(req.userId);
        // console.log("uSER DEATILS >> ", user);
        res.status(200).json({
            message: "logged in user details",
            error: false,
            success: true,
            data: user
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
            data: []
        })
    }
})

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "Logout Successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
})


router.get("/all-user", authToken, async (req, res) => {
    try {
        // console.log("UserId >>", req.userId);
        const users = await User.find();

        res.status(200).json({
            message: "All user",
            error: false,
            success: true,
            data: users
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
})


router.post("/update-user", authToken, async (req, res) => {
    try {
        const sessionUserId = req.userId;  // session id of the logged in user

        const { name, email, role, userId } = req.body;  // userId of the person whose role has to be changed
        const payload = {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(role && { role: role })
        }
        const user = await User.findById(sessionUserId);
        // console.log("Logged in user role >>>", user.role);
        const updatedUser = await User.findByIdAndUpdate(userId, payload);

        res.status(200).json({
            data: updatedUser,
            success: true,
            error: false,
            message: "User Role Updated ..."
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
})


module.exports = router;