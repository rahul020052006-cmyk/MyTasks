const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        

        const token =
            req.body.token ||
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            console.log("Decoded Token:", decoded);

            req.user = decoded;

        } catch (error) {
            console.log(error);

            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }

        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying token",
        });
    }
};

// Student
exports.isStudent = (req, res, next) => {
    try {

        if (req.user.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Protected route for Students only",
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Role verification failed",
        });
    }
};

// Admin
exports.isAdmin = (req, res, next) => {
    try {

        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Protected route for Admin only",
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Role verification failed",
        });
    }
};