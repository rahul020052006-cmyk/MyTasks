const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/Auth");

const {
    auth,
    isStudent,
    isAdmin,
} = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);

// Test Route
router.get("/test", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Protected Route Accessed",
        user: req.user,
    });
});

// Student Route
router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Student",
    });
});

// Admin Route
router.get("/admin", auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin",
    });
});

module.exports = router;