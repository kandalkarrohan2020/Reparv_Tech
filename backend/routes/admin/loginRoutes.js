import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../config/dbconnect.js";

const router = express.Router();

// ✅ User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Use a Promise for db.query
    const user = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) reject({ status: 500, message: "Database error", error: err });
        else if (results.length === 0) reject({ status: 401, message: "Invalid email or password" });
        else resolve(results[0]);
      });
    });

    // ✅ Compare password inside try-catch
    try {
      const isMatch = await bcrypt.compare(password, user?.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Password comparison error", error });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "10d", // Token valid for 10 days
    });

    // ✅ Store session data
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // ✅ Set cookie with 10-day expiry, SameSite: "None", and secure mode based on environment
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ Secure only in production
      sameSite: "None", // ✅ Allows cross-site usage
      maxAge: 10 * 24 * 60 * 60 * 1000, // ✅ 10 days expiry (in milliseconds)
    });

    // ✅ Send response
    return res.json({
      message: "Login successful",
      token,
      user: req.session.user,
    });

  } catch (error) {
    // ✅ Handle database and login errors
    console.error("Login Error:", error);
    return res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
});

// ✅ Get Current User's Session Data
router.get("/session-data", (req, res) => {
  if (req.session.user) {
    res.json({ message: "Session Active", user: req.session.user });
  } else {
    res.status(401).json({ message: "No active session" });
  }
});

// ✅ Logout Route
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("token", { 
      httpOnly: true, 
      secure: true,
      sameSite: "None" 
    });
    console.log("Logout Successfully");
    return res.json({ message: "Logout successful." });
  });
});

export default router;