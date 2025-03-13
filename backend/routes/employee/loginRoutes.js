import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../config/dbconnect.js";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser()); // ✅ Ensure cookies can be parsed

// ✅ User Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Use a Promise for db.query to avoid callback issues
    const user = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM employees WHERE email = ?", [email], (err, results) => {
        if (err) reject({ status: 500, message: "Database error", error: err });
        else if (results.length === 0) reject({ status: 401, message: "Invalid email or password" });
        else resolve(results[0]);
      });
    });

    // ✅ Compare password inside try-catch to handle errors properly
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Store session data properly
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // ✅ Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // ✅ Send successful response
    return res.json({
      message: "Login successful",
      token,
      user: req.session.user, // Now properly stored
    });

  } catch (error) {
    // ✅ Handle database and login errors properly
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
  res.clearCookie("token", { 
    httpOnly: true, 
    secure: true, 
    sameSite: "strict" 
  });
  console.log("Logout SuccessFully");
  return res.json({ message: "Logout successful." });
});


export default router;