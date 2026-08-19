const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Validate and normalize role (Allowed: Admin, Student, Visitor; Default: Visitor)
        const validRoles = ["Admin", "Student", "Visitor"];
        let normalizedRole = "Visitor";

        if (role) {
            const matchedRole = validRoles.find(
                (r) => r.toLowerCase() === role.trim().toLowerCase()
            );
            if (!matchedRole) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid role. Allowed roles are: ${validRoles.join(", ")}`,
                });
            }
            normalizedRole = matchedRole;
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: normalizedRole,
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Signup failed",
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        // JWT token expires in 2 hours
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );

        // Match cookie expiration to 2 hours (2 * 60 * 60 * 1000 ms)
        const options = {
            httpOnly: true,
            expires: new Date(
                Date.now() + 2 * 60 * 60 * 1000
            ),
        };

        // Remove hashed password from user object sent to client
        const userResponse = user.toObject();
        delete userResponse.password;

        return res
            .cookie("token", token, options)
            .status(200)
            .json({
                success: true,
                token,
                user: userResponse,
                message: "Login successful",
            });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};
