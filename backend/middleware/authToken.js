// extracting token from frontend and extracting user details
const jwt = require("jsonwebtoken");


const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(200).json({
                message: "First Login",
                error: true,
                success: false
            })
        }
        // console.log("token>>", token);

        jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
            // console.log("err >>", err);
            // console.log("decoded >>", decoded);

            if (err) {
                console.log("error auth", err);
            }

            req.userId = decoded?.id;
            next();
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = authToken;